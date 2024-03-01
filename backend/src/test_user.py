from fastapi import status
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlmodel.pool import StaticPool
from app import create_app
import pytest
from db import get_session

app = create_app()
client = TestClient(app)


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def register(user, passw, email):
    resp = client.post(
        "/api/v1/user", json={"name": user, "email": email, "password": passw}
    )
    return resp


def test_register(client: TestClient):
    user, passw, email = "foo", "bar", "foo@bar.com"
    resp = register(user, passw, email)
    data = resp.json()
    assert resp.status_code == status.HTTP_201_CREATED
    print(data)
    assert data["id"] is not None
    assert data["name"] == user
    assert data["email"] == email


def test_login(client: TestClient):
    user, passw, email = "foo", "bar", "foo@bar.com"
    register(user, passw, email)
    resp = client.post("/api/v1/user/login", data={"username": user,
                                                   "password": passw}, headers={"Content-Type": "application/x-www-form-urlencoded"})
    assert resp.status_code == status.HTTP_200_OK
    print(resp.text)
