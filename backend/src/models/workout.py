from sqlmodel import SQLModel
from datetime import date


class WorkoutBase(SQLModel):
    date: date


class WorkoutRead(WorkoutBase):
    id: int
    routine_id: int


class WorkoutCreate(WorkoutBase):
    routine_id: int


class WorkoutUpdate(WorkoutBase):
    pass
