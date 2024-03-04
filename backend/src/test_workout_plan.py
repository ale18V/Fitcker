from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlmodel.pool import StaticPool
from app import create_app
import pytest
from db import get_session
from model import WorkoutPlan
from fastapi.encoders import jsonable_encoder


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool, echo=False
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session
    app = create_app()
    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def register(client, user, passw, email):
    resp = client.post(
        "/api/v1/users", json={"username": user, "email": email, "password": passw}
    )
    return resp


def login(client, user, passw, email):
    resp = resp = client.post("/api/v1/users/login", data={"username": user,
                                                           "password": passw}, headers={"Content-Type": "application/x-www-form-urlencoded"})
    return resp


@pytest.fixture(name="token")
def get_token(client: TestClient):
    user = "foo"
    password = "bar"
    email = "foo@bar.com"
    register(client, user, password, email)
    resp = login(client, user, password, email)
    return resp.json()["access_token"]


def add_workout(client: TestClient, plan: WorkoutPlan, token: str):
    resp = client.post("/api/v1/workout-plans", json=jsonable_encoder(plan),
                       headers={'Authorization': f'Bearer {token}'})
    return resp


def get_workouts(client: TestClient, token: str):
    resp = client.get("/api/v1/workout-plans",
                      headers={'Authorization': f'Bearer {token}'})
    return resp


def test_add_workout(client: TestClient, token: str):
    plan_name = "myplan"
    plan = WorkoutPlan(name=plan_name)

    resp = add_workout(client, plan, token)
    assert resp.status_code == 201
    data = resp.json()
    print(data)
    assert data["name"] == plan_name


def test_get_workouts(client: TestClient, token: str):
    plan_name = "myplan"
    plan = WorkoutPlan(name=plan_name)
    resp = add_workout(client, plan, token)
    resp = get_workouts(client, token)
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) == 1
    data = data[0]
    assert data["name"] == plan_name
