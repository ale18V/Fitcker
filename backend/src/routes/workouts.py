from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.tables import Workout, Plan, Routine
from models.workout import WorkoutCreate, WorkoutRead, WorkoutUpdate
import security


router = APIRouter(prefix="/workouts")


@router.get("/", response_model=List[WorkoutRead])
async def read_workouts(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):
    query = select(Workout) \
        .join(Routine) \
        .join(Plan) \
        .where(Workout.routine_id == Routine.id) \
        .where(Routine.plan_id == Plan.id) \
        .where(Plan.creator_id == user_id)

    workouts = con.exec(query).all()

    return workouts


@router.post("/", status_code=201, response_model=WorkoutRead)
async def create_workout(
        workout: WorkoutCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

    db_workout: Workout = Workout.model_validate(workout)
    con.add(db_workout)
    con.commit()
    con.refresh(db_workout)
    return db_workout


@router.patch("/{workout_id}", response_model=Workout)
async def update_workout(
        workout_id: int,
        workout: WorkoutUpdate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]) -> Workout:

    db_workout = con.get(Workout, workout_id)
    if not db_workout:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout not found")

    new_data = workout.model_dump(exclude_unset=True)
    db_workout.sqlmodel_update(new_data)
    con.add(db_workout)
    con.commit()
    con.refresh(db_workout)
    return db_workout
