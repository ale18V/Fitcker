from fastapi import FastAPI
from fastapi.routing import APIRouter
import db
from routes import exercises, plans, routines, routines_exercises, users, workout_exercises, workouts


def create_app():
    app = FastAPI()

    @app.on_event("startup")
    async def setup_db():
        db.create_tables()

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
