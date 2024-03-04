from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.workout_plan import WorkoutPlanCreate, WorkoutPlanRead, WorkoutPlanUpdate
from models.db import WorkoutPlan
import security


router = APIRouter(prefix="/workout-plans")


@router.get("/", response_model=List[WorkoutPlanRead])
async def read_workout_plans(con: Annotated[Session, Depends(db.get_session)],
                             user_id: Annotated[int, Depends(security.get_current_user_id)]):
    plans = con.exec(select(WorkoutPlan).where(
        WorkoutPlan.creator_id == user_id)).all()
    return plans


@router.get("/{id}", response_model=WorkoutPlanRead)
async def read_workout_plan(id: int,
                            con: Annotated[Session, Depends(db.get_session)],
                            user_id: Annotated[int, Depends(security.get_current_user_id)]) -> WorkoutPlan:
    plan = con.get(WorkoutPlan, id)
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Workout plan not found")
    return plan


@router.post("/", status_code=201, response_model=WorkoutPlanRead)
async def create_workout_plan(
        workout_plan: WorkoutPlanCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

    db_workout_plan = WorkoutPlan.model_validate(workout_plan)
    db_workout_plan.creator_id = user_id
    con.add(db_workout_plan)
    con.commit()
    con.refresh(db_workout_plan)
    return db_workout_plan


@router.patch("/{id}", response_model=WorkoutPlanRead)
async def update_workout_plan(id: int,
                              workout_plan: WorkoutPlanUpdate,
                              con: Annotated[Session, Depends(db.get_session)],
                              user_id: Annotated[int, Depends(security.get_current_user_id)]) -> WorkoutPlan:

    db_workout_plan = con.get(WorkoutPlan, id)
    if not db_workout_plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Workout plan not found")
    new_data = workout_plan.model_dump(exclude_unset=True)
    db_workout_plan.sqlmodel_update(new_data)
    con.add(db_workout_plan)
    con.commit()
    con.refresh(db_workout_plan)
    return db_workout_plan
