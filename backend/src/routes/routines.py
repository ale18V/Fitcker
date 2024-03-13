from typing import Annotated, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.db import Routine, Plan
from models.routine import RoutineCreate, RoutineRead, RoutineUpdate
import security


router = APIRouter(prefix="/routines")


@router.get("/", response_model=List[RoutineRead])
async def read_routines(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        plan_id: Optional[int] = None):

    query = select(Routine).join(Plan).where(Routine.plan_id ==
                                             Plan.id).where(Plan.creator_id == user_id)

    if plan_id:
        query = query.where(Plan.id == plan_id)

    routines = con.exec(query).all()
    return routines


@router.get("/{id}", response_model=RoutineRead)
async def read_routine(id: int,
                       con: Annotated[Session, Depends(db.get_session)],
                       user_id: Annotated[int, Depends(security.get_current_user_id)]):

    routine = con.get(Routine, id)
    if not routine:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Routine not found")

    return routine


@router.post("/", status_code=201, response_model=RoutineRead)
async def create_routine(
        routine: RoutineCreate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):
    db_routine = Routine.model_validate(routine)
    con.add(db_routine)
    con.commit()
    con.refresh(db_routine)
    return db_routine


@router.patch("/{routine_id}", response_model=Routine)
async def update_routine(
        routine_id: int,
        routine: RoutineUpdate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]) -> Routine:

    db_routine = con.get(Routine, routine_id)
    if not db_routine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Routine not found")

    new_data = routine.model_dump(exclude_unset=True)
    db_routine.sqlmodel_update(new_data)
    con.add(db_routine)
    con.commit()
    con.refresh(db_routine)
    return db_routine
