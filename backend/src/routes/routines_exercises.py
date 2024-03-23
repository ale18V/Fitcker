from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

import db
from models.tables import RoutineExerciseLink
import security


router = APIRouter(prefix="/routines-exercises")


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=RoutineExerciseLink)
async def add_exercise_to_routine(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        routine_exercise: RoutineExerciseLink):

    con.add(routine_exercise)
    con.commit()
    con.refresh(routine_exercise)
    return routine_exercise


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT, response_model=None)
async def delete_exercise_from_routine(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        routine_id: int,
        exercise_id: int):

    routine_exercise_pair = con.get(
        RoutineExerciseLink, {"routine_id": routine_id, "exercise_id": exercise_id})
    if not routine_exercise_pair:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Routine-Exercise pair not found")

    con.delete(routine_exercise_pair)
    con.commit()
