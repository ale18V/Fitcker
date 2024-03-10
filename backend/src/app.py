from fastapi import FastAPI
from fastapi.routing import APIRouter
import db
from routes import exercises, plans, routines, routines_exercises, users, workout_exercises, workouts
from contextlib import asynccontextmanager


def create_app():

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        db.create_tables()
        yield

    app = FastAPI(lifespan=lifespan)

    api = APIRouter(prefix="/api/v1")
    api.include_router(router=users.router)
    api.include_router(router=plans.router)
    api.include_router(router=routines.router)
    api.include_router(router=exercises.router)
    api.include_router(router=workouts.router)
    api.include_router(router=routines_exercises.router)
    api.include_router(router=workout_exercises.router)

    app.include_router(api)
    return app
