from fastapi import FastAPI
from fastapi.routing import APIRouter
import db
from routes import exercises, users, workout_plans, workout_routines


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

    app.include_router(api)
    return app
