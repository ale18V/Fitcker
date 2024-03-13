from sqlmodel import SQLModel
from datetime import date
from typing import Optional


class PlanBase(SQLModel):
    name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class PlanRead(PlanBase):
    id: int


class PlanCreate(PlanBase):
    pass


class PlanUpdate(PlanBase):
    pass
