from os import getenv
from sqlalchemy import Engine
from sqlmodel import create_engine, SQLModel, Session


conf = {
    "user": getenv("MYSQL_USER"),
    "password": getenv("MYSQL_PASSWORD"),
    "host": getenv("MYSQL_HOST"),
    "database": getenv("MYSQL_DATABASE"),
    "debug": getenv("DEBUG") is not None,
}

db_url = f"mysql+mysqlconnector://{conf['user']}:{conf['password']}@{conf['host']}/{conf['database']}"
engine: Engine


def get_session():
    global engine
    with Session(engine) as session:
        yield session


def create_tables():  # Want to run it only once
    global engine
    engine = create_engine(db_url, echo=conf["debug"])
    SQLModel.metadata.create_all(engine)


def drop_tables():
    global engine
    SQLModel.metadata.drop_all(engine)
