from typing import Annotated, List, Optional, Sequence
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.tables import Exercise, Routine
from models.exercise import ExerciseCreate, ExerciseRead, ExerciseUpdate
import security

router = APIRouter(prefix="/exercises")


@router.get("/", response_model=List[ExerciseRead])
async def read_exercises(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        routine_id: Optional[int] = None):

    exercises: List[Exercise] | Sequence[Exercise]
    if routine_id:
        routine = con.get(Routine, routine_id)
        if not routine:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Routine not found")
        exercises = routine.exercises
    else:
        exercises = con.exec(select(Exercise)
                             .where(Exercise.creator_id == user_id)).all()
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseRead)
async def read_exercise(
        exercise_id: int,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

    exercise = con.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Exercise not found")
    return exercise


@router.post("/", status_code=201, response_model=ExerciseRead)
async def create_exercise(
        exercise: ExerciseCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

    db_exercise = Exercise.model_validate(exercise)
    db_exercise.creator_id = user_id
    con.add(db_exercise)
    con.commit()
    con.refresh(db_exercise)
    return db_exercise


@router.patch("/{exercise_id}", response_model=ExerciseRead)
async def update_exercise(
        exercise_id: int,
        exercise: ExerciseUpdate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]) -> Exercise:

    db_exercise = con.get(Exercise, exercise_id)
    if not db_exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")

    new_data = exercise.model_dump(exclude_unset=True)
    db_exercise.sqlmodel_update(new_data)
    con.add(db_exercise)
    con.commit()
    con.refresh(db_exercise)
    return db_exercise
