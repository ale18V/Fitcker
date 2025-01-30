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

    api.include_router(router=users.router)
    api.include_router(router=plans.router)
    api.include_router(router=routines.router)
    api.include_router(router=exercises.router)
    api.include_router(router=workouts.router)
    api.include_router(router=routines_exercises.router)
    api.include_router(router=workout_exercises.router)
    api.include_router(router=plans_routines.router)

    app = FastAPI()
    app.mount("/api/v1", api)
    return app
