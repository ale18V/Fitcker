from fastapi import FastAPI
import db
from routes import users, workout_plans


def create_app():
    app = FastAPI()

    @app.on_event("startup")
    async def setup_db():
        db.create_tables()

    app.include_router(router=users.router, prefix="/api/v1")
    app.include_router(router=workout_plans.router, prefix="/api/v1")
    return app
