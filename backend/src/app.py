from fastapi import FastAPI
import db
from routes import exercises, plans, plans_routines, routines, routines_exercises, users, workout_exercises, workouts
from contextlib import asynccontextmanager


def create_app():

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        db.create_tables()
        yield
        # db.drop_tables()

    api = FastAPI(lifespan=lifespan)

    api.include_router(users.router, tags=["Users"])
    api.include_router(plans.router, tags=["Plans"])
    api.include_router(routines.router, tags=["Routines"])
    api.include_router(exercises.router, tags=["Exercises"])
    api.include_router(workouts.router, tags=["Workouts"])
    api.include_router(routines_exercises.router, tags=["Routines", "Exercises"])
    api.include_router(workout_exercises.router, tags=["Workouts", "Exercises"])
    api.include_router(plans_routines.router, tags=["Plans", "Routines"])

    app = FastAPI()
    app.mount("/api/v1", api)
    return app
