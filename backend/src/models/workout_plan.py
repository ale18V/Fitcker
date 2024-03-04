from sqlmodel import SQLModel
from datetime import date
from typing import Optional


class WorkoutPlanBase(SQLModel):
    name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class WorkoutPlanRead(WorkoutPlanBase):
    id: int


class WorkoutPlanCreate(WorkoutPlanBase):
    pass


class WorkoutPlanUpdate(WorkoutPlanBase):
    pass
