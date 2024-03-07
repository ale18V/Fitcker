from fastapi import FastAPI
from fastapi.routing import APIRouter
import db
from routes import exercises, routines_exercises, users, workout_exercises, workout_plans, workout_routines, workouts


def create_app():
    app = FastAPI()

    @app.on_event("startup")
    async def setup_db():
        db.create_tables()

    api = APIRouter(prefix="/api/v1")
    api.include_router(router=users.router)
    api.include_router(router=workout_plans.router)
    api.include_router(router=workout_routines.router)
    api.include_router(router=exercises.router)
    api.include_router(router=workouts.router)
    api.include_router(router=routines_exercises.router)
    api.include_router(router=workout_exercises.router)

    app.include_router(api)
    return app
