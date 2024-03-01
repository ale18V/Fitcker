from datetime import timedelta
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from model import User
from sqlmodel import Session, select
import db
from security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    Token,
    create_access_token,
)
import security


def create_app(db_url=None):
    app = FastAPI()

    @app.on_event("startup")
    async def setup_db():
        db.create_tables()

    @app.post("/api/v1/user", status_code=201)
    async def register(user: User, con: Annotated[Session, Depends(db.get_session)]):

        res = con.exec(select(User).where(
            User.name == user.name)).one_or_none()
        if res:
            raise HTTPException(
                status_code=409, detail="User already registered")

        user.password = security.get_password_hash(user.password)
        con.add(user)
        con.commit()
        con.refresh(user)
        return user

    @app.post("/api/v1/user/login")
    async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                    con: Annotated[Session, Depends(db.get_session)]) -> Token:
        user = con.exec(select(User).where(
            User.name == form_data.username)).one_or_none()
        if not user or not security.verify_password(plain_password=form_data.password, hashed_password=user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.name}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")

    return app
