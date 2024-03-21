from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
import db
from models.user import UserCreate, UserRead
from models.tables import User
import security

router = APIRouter(prefix="/users")


class Message(BaseModel):
    msg: str


@router.post("/", status_code=201, response_model=UserRead,
             responses={409: {"model": Message}})
async def register(user: UserCreate, con: Annotated[Session, Depends(db.get_session)]):
    db_user: User = User.model_validate(user)
    db_user.password = security.get_password_hash(user.password)
    con.add(db_user)
    try:
        con.commit()
    except IntegrityError:
        con.rollback()
        return JSONResponse(status_code=status.HTTP_409_CONFLICT,
                            content=Message(msg="Username or mail already taken").model_dump())
    con.refresh(db_user)
    return db_user


@router.post("/login", response_model=security.Token,
             responses={400: {"model": Message}})
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                con: Annotated[Session, Depends(db.get_session)]):

    query = select(User) \
        .where(User.username == form_data.username)
    user = con.exec(query).one_or_none()

    if not user or not security.verify_password(form_data.password, user.password):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=Message(msg="Incorrect username or password").model_dump(),
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = security.create_access_token(
        data={"user_id": user.id}, expires_delta=timedelta(days=1))
    return security.Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserRead,
            responses={404: {"model": Message}})
async def current_user(user_id: Annotated[int, Depends(security.get_current_user_id)],
                       con: Annotated[Session, Depends(db.get_session)]):
    user = con.get(User, user_id)
    if not user:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND,
                            content=Message(msg="User not found").model_dump())
    return user
