from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
import db
from model import User
import security

router = APIRouter(prefix="/user")


@router.post("/", status_code=201)
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


@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                con: Annotated[Session, Depends(db.get_session)]) -> security.Token:
    user = con.exec(select(User).where(
        User.name == form_data.username)).one_or_none()
    if not user or not security.verify_password(plain_password=form_data.password, hashed_password=user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = security.create_access_token(
        data={"user_id": user.id}, expires_delta=timedelta(days=1))
    return security.Token(access_token=access_token, token_type="bearer")


@router.get("/me")
async def current_user(user_id: Annotated[int, Depends(security.get_current_user_id)],
                       con: Annotated[Session, Depends(db.get_session)]) -> User:
    user = con.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
