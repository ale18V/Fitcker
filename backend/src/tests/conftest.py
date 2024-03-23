from typing import Any
import pytest
from requests import Response
import schemathesis
from fastapi.testclient import TestClient
from app import create_app
from schemathesis.schemas import BaseSchema
from tests.constants import EMAIL, LOGIN_URL, PASSWORD, REGISTER_URL, USERNAME
from tests.utils import setup_app, teardown_app
schemathesis.experimental.OPEN_API_3_1.enable()


@pytest.fixture(name="app")
def init_app():
    app = create_app()
    engine = setup_app(app)

    yield app
    teardown_app(app, engine)


@pytest.fixture()
def auth_client(app):
    with TestClient(app) as client:
        # Create a user inside db
        response = client.post(REGISTER_URL, json={
            "username": USERNAME, "password": PASSWORD, "email": EMAIL})

        # Make a login request
        response = client.post(
            LOGIN_URL, data={"username": USERNAME, "password": PASSWORD},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        token = response.json()["access_token"]
        client.headers.update({"Authorization": f"Bearer {token}"})
        yield client


@pytest.fixture(name="BaseAPIWorkflow")
def base_state_machine(schema: BaseSchema):
    BaseAPIWorkflow = schema.as_state_machine()

    def after_call(self, response: Response, case: schemathesis.Case) -> None:
        print(case.method, case.path, str(case))
        print(response.status_code, response.text)

    BaseAPIWorkflow.after_call = after_call
    return BaseAPIWorkflow


@pytest.fixture
def auth_state_machine(app, BaseAPIWorkflow):
    class AuthenticatedAPIWorkflow(BaseAPIWorkflow):
        token: str
        headers: dict[str, str]

        def __init__(self) -> None:
            with TestClient(app) as client:
                # Create a user inside db
                response = client.post(REGISTER_URL, json={
                    "username": USERNAME, "password": PASSWORD, "email": EMAIL})

                # Make a login request
                response = client.post(
                    LOGIN_URL, data={"username": USERNAME, "password": PASSWORD},
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                )

                # Parse the response and store the token in headers
                self.token = response.json()["access_token"]
                self.headers = {"Authorization": f"Bearer {self.token}"}

            return super().__init__()

        def get_call_kwargs(self, case) -> dict[str, Any]:
            # Use stored headers
            return {"headers": self.headers}

    return AuthenticatedAPIWorkflow()
