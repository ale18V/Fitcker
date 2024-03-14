from sqlmodel import SQLModel, Field
from pydantic import EmailStr


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True, min_length=1)
    email: str = Field(unique=True)


class UserRead(UserBase):
    id: int


class UserCreate(UserBase):
    email: EmailStr
    password: str = Field(min_length=1)
