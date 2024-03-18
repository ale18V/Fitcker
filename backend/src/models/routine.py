from sqlmodel import SQLModel
from typing import Optional


class RoutineBase(SQLModel):
    name: Optional[str] = None


class RoutineRead(RoutineBase):
    id: int


class RoutineCreate(RoutineBase):
    pass


class RoutineUpdate(RoutineBase):
    pass
