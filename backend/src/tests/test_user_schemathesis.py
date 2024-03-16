from hypothesis import settings
import hypothesis
import pytest
from requests import Response
import schemathesis
from schemathesis import Case
from schemathesis.checks import not_a_server_error, response_schema_conformance
from app import create_app
from sqlmodel import Session, create_engine, StaticPool, SQLModel
from db import get_session
import db

schemathesis.experimental.OPEN_API_3_1.enable()
db.create_tables = lambda: None
db.drop_tables = lambda: None
app = create_app()
schema = schemathesis.from_asgi("/openapi.json", app)
schema.add_link(source=schema["/api/v1/users/"]["POST"],
                target=schema["/api/v1/users/login"]["POST"],
                status_code=201,
                request_body="username={$request.body#/username}&password={$request.body#/password}",
                )


@pytest.fixture()
def setup_db():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool, echo=False
    )
    SQLModel.metadata.create_all(engine)

    def get_session_override():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[get_session] = get_session_override
    yield
    SQLModel.metadata.drop_all(engine)
    engine.dispose()
    app.dependency_overrides.clear()


@schema.parametrize(endpoint="/api/v1/users/$")
@settings(max_examples=10, suppress_health_check=[hypothesis.HealthCheck.function_scoped_fixture])
@pytest.mark.usefixtures("setup_db")
def test_register(case: Case):
    resp = case.call_asgi()
    case.validate_response(resp, checks=(not_a_server_error, response_schema_conformance,))


class UserWorkflow(schema.as_state_machine()):
    def setup(self) -> None:
        engine = create_engine(
            "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool, echo=False
        )
        SQLModel.metadata.create_all(engine)
        with Session(engine) as session:
            app.dependency_overrides[get_session] = lambda: session
        self.engine = engine
        return super().setup()

    def teardown(self) -> None:
        app.dependency_overrides.clear()
        SQLModel.metadata.drop_all(self.engine)
        return super().teardown()

    def before_call(self, case: Case) -> None:
        if case.endpoint == schema["/api/v1/users/login"]["POST"]:
            case.headers.update({'content-type': 'application/x-www-form-urlencoded'})
        return super().before_call(case)

    def validate_response(self, response: Response, case: Case) -> None:
        return case.validate_response(response, checks=(not_a_server_error, response_schema_conformance,))


def test_login_flow():
    machine = UserWorkflow()
    machine.run(settings=settings(verbosity=hypothesis.Verbosity.normal, deadline=None,
                                  suppress_health_check=hypothesis.HealthCheck.all()))
