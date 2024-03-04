from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True)


class UserRead(UserBase):
    id: int


class UserCreate(UserBase):
    password: str
