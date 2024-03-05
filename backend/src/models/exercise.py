from sqlmodel import Field, SQLModel
from typing import Optional


class ExercieseBase(SQLModel):
    name: str = Field(unique=True, index=True)
    description: Optional[str] = None


class ExerciseRead(ExercieseBase):
    id: int


class ExerciseCreate(ExercieseBase):
    pass


class ExerciseUpdate(ExercieseBase):
    pass
