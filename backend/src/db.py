from os import getenv
from sqlmodel import create_engine, SQLModel, Session


conf = {
    "user": getenv("MYSQL_USER"),
    "password": getenv("MYSQL_PASSWORD"),
    "host": getenv("MYSQL_HOST"),
    "database": getenv("MYSQL_DATABASE"),
    "debug": getenv("DEBUG") is not None,
}

db_url = f"mysql+mysqlconnector://{conf['user']}:{conf['password']}@{conf['host']}/{conf['database']}"
engine = create_engine(db_url, echo=conf["debug"])


def get_session():
    with Session(engine) as session:
        yield session


def create_tables():  # Want to run it only once
    SQLModel.metadata.create_all(engine)
