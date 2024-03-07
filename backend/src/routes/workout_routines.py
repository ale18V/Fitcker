from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.db import WorkoutRoutine, WorkoutPlan
from models.workout_routine import WorkoutRoutineCreate, WorkoutRoutineRead, WorkoutRoutineUpdate
import security


router = APIRouter(prefix="/workout-routines")


@router.get("/", response_model=List[WorkoutRoutineRead])
async def read_routines(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):
    routines = con.exec(select(WorkoutRoutine)
                        .join(WorkoutPlan)
                        .where(WorkoutRoutine.plan_id == WorkoutPlan.id)
                        .where(WorkoutPlan.creator_id == user_id)).all()
    return routines


@router.get("/{id}", response_model=WorkoutRoutineRead)
async def read_routine(id: int,
                       con: Annotated[Session, Depends(db.get_session)],
                       user_id: Annotated[int, Depends(security.get_current_user_id)]):

    routine = con.get(WorkoutRoutine, id)
    if not routine:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Routine not found")

    return routine


@router.post("/", status_code=201, response_model=WorkoutRoutineRead)
async def create_routine(
        routine: WorkoutRoutineCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):
    db_routine = WorkoutRoutine.model_validate(routine)
    con.add(db_routine)
    con.commit()
    con.refresh(db_routine)
    return db_routine


@router.patch("/{routine_id}", response_model=WorkoutRoutine)
async def update_routine(
        routine_id: int,
        routine: WorkoutRoutineUpdate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]) -> WorkoutRoutine:

    db_routine = con.get(WorkoutRoutine, routine_id)
    if not db_routine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Routine not found")

    new_data = routine.model_dump(exclude_unset=True)
    db_routine.sqlmodel_update(new_data)
    con.add(db_routine)
    con.commit()
    con.refresh(db_routine)
    return db_routine
