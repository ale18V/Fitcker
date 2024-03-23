from sqlmodel import Session, create_engine, StaticPool, SQLModel
import db


def setup_app(app):
    db.create_tables = lambda: None
    db.drop_tables = lambda: None

    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool, echo=False
    )
    SQLModel.metadata.create_all(engine)

    def get_session_override():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[db.get_session] = get_session_override
    return engine


def teardown_app(app, engine):
    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(engine)
