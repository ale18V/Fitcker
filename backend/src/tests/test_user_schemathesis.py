from typing import Any
from hypothesis import settings
import hypothesis
import pytest
from requests import Response
import schemathesis
from schemathesis import Case

from tests.constants import LOGIN_PATH
from tests.utils import setup_app, teardown_app


@pytest.fixture(name="schema")
def create_schema(app):
    schema = schemathesis.from_asgi("/openapi.json", app)
    schema.add_link(source=schema["/api/v1/users/"]["POST"],
                    target=schema["/api/v1/users/login"]["POST"],
                    status_code=201,
                    request_body="username={$request.body#/username}&password={$request.body#/password}",
                    )
    return schema


schema = schemathesis.from_pytest_fixture("schema")


@schema.parametrize(endpoint="/api/v1/users/$")
@settings(suppress_health_check=[hypothesis.HealthCheck.function_scoped_fixture])
def test_register(case: Case):
    resp = case.call_asgi()
    case.validate_response(resp)


def test_login_flow(BaseAPIWorkflow):
    class UserWorkflow(BaseAPIWorkflow):
        def setup(self):
            self.engine = setup_app(self.schema.app)

        def teardown(self):
            teardown_app(self.schema.app, self.engine)

        def before_call(self, case: Case) -> None:
            super().before_call(case)
            if case.operation == self.schema[LOGIN_PATH]["POST"]:
                case.headers.update({'content-type': 'application/x-www-form-urlencoded'})

    machine = UserWorkflow()
    machine.run(settings=settings(
        verbosity=hypothesis.Verbosity.verbose, deadline=None,
        suppress_health_check=[hypothesis.HealthCheck.filter_too_much,
                               hypothesis.HealthCheck.too_slow],
        max_examples=50))
