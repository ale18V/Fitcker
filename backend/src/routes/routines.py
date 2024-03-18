from typing import Annotated, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

import db
from models.tables import Routine, Plan, User
from models.routine import RoutineCreate, RoutineRead, RoutineUpdate
import security


router = APIRouter(prefix="/routines")


@router.get("/", response_model=List[RoutineRead])
async def read_routines(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        plan_id: Optional[int] = None):

    if plan_id is None:
        user = con.get(User, user_id)
        return user.routines
    else:
        plan = con.get(Plan, plan_id)
        if not plan:
            return []
        elif plan.creator_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Plan not owned by the current user")
        else:
            return plan.routines


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
    db_routine.creator_id = user_id
    con.add(db_routine)
    con.commit()
    con.refresh(db_routine)
    return db_routine


@router.patch("/{routine_id}", response_model=RoutineRead)
async def update_routine(
        routine_id: int,
        routine: RoutineUpdate,
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)]):

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
