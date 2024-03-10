from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.plan import PlanCreate, PlanRead, PlanUpdate
from models.db import Plan
import security


router = APIRouter(prefix="/plans")


@router.get("/", response_model=List[PlanRead])
async def read_workout_plans(con: Annotated[Session, Depends(db.get_session)],
                             user_id: Annotated[int, Depends(security.get_current_user_id)]):
    plans = con.exec(select(Plan).where(
        Plan.creator_id == user_id)).all()
    return plans


@router.get("/{id}", response_model=PlanRead)
async def read_workout_plan(id: int,
                            con: Annotated[Session, Depends(db.get_session)],
                            user_id: Annotated[int, Depends(security.get_current_user_id)]) -> Plan:
    plan = con.get(Plan, id)
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Workout plan not found")
    return plan


@router.post("/", status_code=201, response_model=PlanRead)
async def create_workout_plan(
        workout_plan: PlanCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

    db_workout_plan = Plan.model_validate(workout_plan)
    db_workout_plan.creator_id = user_id
    con.add(db_workout_plan)
    con.commit()
    con.refresh(db_workout_plan)
    return db_workout_plan


@router.patch("/{id}", response_model=PlanRead)
async def update_workout_plan(id: int,
                              workout_plan: PlanUpdate,
                              con: Annotated[Session, Depends(db.get_session)],
                              user_id: Annotated[int, Depends(security.get_current_user_id)]) -> Plan:

    db_workout_plan = con.get(Plan, id)
    if not db_workout_plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Workout plan not found")
    new_data = workout_plan.model_dump(exclude_unset=True)
    db_workout_plan.sqlmodel_update(new_data)
    con.add(db_workout_plan)
    con.commit()
    con.refresh(db_workout_plan)
    return db_workout_plan
