from hypothesis import settings
import hypothesis
import pytest
import schemathesis

from tests.constants import ROUTINES_PATH


@pytest.fixture(name="schema")
def create_schema(app):
    schema = schemathesis.from_asgi("/openapi.json", app)
    schema.add_link(source=schema[ROUTINES_PATH]["POST"],
                    target=schema[ROUTINES_PATH + "{id}"]["GET"],
                    status_code=201,
                    parameters={"id": "$response.body#/id"})
    schema.add_link(source=schema[ROUTINES_PATH]["POST"],
                    target=schema[ROUTINES_PATH + "{id}"]["PATCH"],
                    status_code=201,
                    parameters={"id": "$response.body#/id"})
    return schema


schema = schemathesis.from_pytest_fixture("schema")


@schema.parametrize(endpoint=ROUTINES_PATH, method="POST")
@settings(suppress_health_check=[hypothesis.HealthCheck.function_scoped_fixture])
def test_create_plan(case: schemathesis.Case, auth_client):
    case.call_and_validate(session=auth_client)


def test_plan_flow(auth_state_machine):
    auth_state_machine.run(settings=settings(
        max_examples=50,
        deadline=None,
        verbosity=hypothesis.Verbosity.verbose,
        suppress_health_check=[hypothesis.HealthCheck.too_slow],
        stateful_step_count=5))
