from sqlmodel import SQLModel
from typing import Optional


class WorkoutRoutineBase(SQLModel):
    name: Optional[str] = None


class WorkoutRoutineRead(WorkoutRoutineBase):
    id: int


class WorkoutRoutineCreate(WorkoutRoutineBase):
    plan_id: int


class WorkoutRoutineUpdate(WorkoutRoutineBase):
    pass
