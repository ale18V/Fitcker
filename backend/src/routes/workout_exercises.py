from typing import Annotated, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.db import WorkoutExerciseLink
import security


router = APIRouter(prefix="/workout-exercises")


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=WorkoutExerciseLink)
async def add_workout_stats(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        workout_exercise: WorkoutExerciseLink):

    con.add(workout_exercise)
    con.commit()
    con.refresh(workout_exercise)
    return workout_exercise


@router.get("/", response_model=List[WorkoutExerciseLink])
async def read_routine_exercise_pairs(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        workout_id: Optional[int] = None,
        exercise_id: Optional[int] = None):

    query = select(WorkoutExerciseLink)
    if workout_id:
        query = query.where(WorkoutExerciseLink.workout_id == workout_id)
    if exercise_id:
        query = query.where(WorkoutExerciseLink.exercise_id == exercise_id)

    res = con.exec(query).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Routine not found")

    return res


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_exercise_from_routine(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        workout_id: int,
        exercise_id: int):

    routine_exercise_pair = con.get(
        WorkoutExerciseLink, {"workout_id": workout_id, "exercise_id": exercise_id})
    if not routine_exercise_pair:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Exercise not found in the routine")

    con.delete(routine_exercise_pair)
    con.commit()
