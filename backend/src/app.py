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
    authenticate_user,
    create_access_token,
)


def create_app(db_url=None):
    app = FastAPI()

    @app.on_event("startup")
    async def setup_db():
        db.create_tables()

    @app.post("/api/v1/user", status_code=201)
    async def register(user: User, con: Annotated[Session, Depends(db.get_session)]):

        res = con.exec(select(User).where(User.email == user.email)).one_or_none()
        if res:
            raise HTTPException(status_code=409, detail="User already registered")

        con.add(user)
        con.commit()
        con.refresh(user)
        return user

    @app.post("/api/v1/user/login")
    async def login(user: User, con: Annotated[Session, Depends(db.get_session)]):
        if con.exec(select(User).where(User.name == user.name)).one_or_none():
            return {"status": "success", "msg": "User logged in"}
        else:
            return {"status": "error", "msg": "Wrong credentials"}

    @app.post("/token")
    async def login_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
    ) -> Token:
        user = authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")

    return app
