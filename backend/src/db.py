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


def connect():
    return engine.connect()


def create_db_and_tables():  # Want to run it only once
    # Move to init.py
    SQLModel.metadata.create_all(engine)


create_db_and_tables()
