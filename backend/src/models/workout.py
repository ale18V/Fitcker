from models.user import User


from sqlmodel import Field, Relationship, SQLModel


from datetime import date
from typing import List, Optional


class RoutineExerciseLink(SQLModel, table=True):
    routine_id: Optional[int] = Field(
        default=None, primary_key=True, foreign_key="workoutroutine.id"
    )
    exercise_id: Optional[int] = Field(
        default=None, primary_key=True, foreign_key="exercise.id"
    )


class WorkoutExerciseLink(SQLModel, table=True):
    workout_id: int = Field(primary_key=True, foreign_key="workout.id")
    exercise_id: int = Field(primary_key=True, foreign_key="exercise.id")
    sets: Optional[int]
    reps: Optional[int]
    rest: Optional[float]
    weight: Optional[float]

    workout: "Workout" = Relationship(back_populates="exercise_links")
    exercise: "Exercise" = Relationship(back_populates="workout_links")


class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    description: Optional[str]

    routines: List["WorkoutRoutine"] = Relationship(
        back_populates="exercises", link_model=RoutineExerciseLink
    )
    workout_links: List["WorkoutExerciseLink"] = Relationship(
        back_populates="exercise")


class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: date

    routine_id: Optional[int] = Field(foreign_key="workoutroutine.id")
    routine: "WorkoutRoutine" = Relationship(back_populates="workouts")
    exercise_links: List["WorkoutExerciseLink"] = Relationship(
        back_populates="workout")


class WorkoutRoutine(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str]

    plan_id: Optional[int] = Field(
        foreign_key="workoutplan.id", nullable=False)
    workout_plan: "WorkoutPlan" = Relationship(back_populates="routines")
    workouts: List["Workout"] = Relationship(back_populates="routine")
    exercises: List["Exercise"] = Relationship(
        back_populates="routines", link_model=RoutineExerciseLink
    )


class WorkoutPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]

    creator_id: Optional[int] = Field(foreign_key="user.id", nullable=False)
    creator: Optional["User"] = Relationship(back_populates="plans")
    routines: List["WorkoutRoutine"] = Relationship(
        back_populates="workout_plan")
