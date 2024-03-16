from sqlmodel import SQLModel, Field
from pydantic import EmailStr, validator
import string


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True, min_length=1)
    email: str = Field(unique=True)


class UserRead(UserBase):
    id: int


class UserCreate(UserBase):
    email: EmailStr
    password: str = Field(
        min_length=1, description=f"Only alphanumeric characters and {string.punctuation} are allowed in this field")

    @validator("password")
    def check_password_characters(cls, value: str):
        allowed = set(string.ascii_letters + string.digits + string.punctuation)
        if not all([c in allowed for c in value]):
            raise ValueError("Bad character in password")
        return value
