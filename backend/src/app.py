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

    api = FastAPI(
        title="Fitcker",
        description="A simple workout tracker",
        openapi_tags=[
            {"name": "Users", "description": "Register and login users"},
            {"name": "Plans", "description": "Operations with plans"},
            {"name": "Routines", "description": "Operations with routines"},
            {"name": "Exercises", "description": "Operations with exercises"},
            {"name": "Workouts", "description": "Operations with workouts"},
        ],
    )

    api.include_router(users.router, tags=["Users"])
    api.include_router(plans.router, tags=["Plans"])
    api.include_router(routines.router, tags=["Routines"])
    api.include_router(exercises.router, tags=["Exercises"])
    api.include_router(workouts.router, tags=["Workouts"])
    api.include_router(routines_exercises.router, tags=["Routines", "Exercises"])
    api.include_router(workout_exercises.router, tags=["Workouts", "Exercises"])
    api.include_router(plans_routines.router, tags=["Plans", "Routines"])

    # Lifespan on sub-mounted apps is not supported ATM
    app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)
    app.mount("/api/v1", api)
    return app
