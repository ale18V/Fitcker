from typing import Annotated, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

import db
from models.tables import PlanRoutineLink
import security


router = APIRouter(prefix="/plans-routines")


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PlanRoutineLink)
async def add_routine_to_plan(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        plan_routine_pair: PlanRoutineLink):

    con.add(plan_routine_pair)
    con.commit()
    con.refresh(plan_routine_pair)
    return plan_routine_pair


@router.get("/", response_model=List[PlanRoutineLink])
async def read_plan_routine_pairs(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        plan_id: Optional[int] = None,
        routine_id: Optional[int] = None):

    query = select(PlanRoutineLink)
    if plan_id:
        query = query.where(PlanRoutineLink.plan_id == plan_id)
    if routine_id:
        query = query.where(PlanRoutineLink.routine_id == routine_id)

    res = con.exec(query).all()
    return res


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_routine_from_plan(
        con: Annotated[Session, Depends(db.get_session)],
        user_id: Annotated[int, Depends(security.get_current_user_id)],
        plan_id: int,
        routine_id: int):

    plan_routine_pair = con.get(
        PlanRoutineLink, {"routine_id": routine_id, "plan_id": plan_id})
    if not plan_routine_pair:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Plan-Routine pair not found")

    con.delete(plan_routine_pair)
    con.commit()
