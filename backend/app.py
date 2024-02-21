from typing import Annotated
from fastapi import FastAPI
from model import User
from sqlmodel import Session, select, insert
import db

app = FastAPI()

@app.post("/api/v1/user/register")
async def register(user: User):
    con = db.connect()
    res = con.execute(select(User).where(User.email == user.email)).one_or_none()
    if res:
        return {"status": "error", "msg": "Email already used"}
    
    con.execute(insert(User).values(name=user.name, email=user.email, password=user.password))
    con.commit()
    con.close()
    return {"status": "success", "msg": "User registered successfully"}

@app.post("/api/v1/user/login")
async def login(user: User):
    with Session(db.engine) as session:
        if session.exec(select(User).where(User.name == user.name)).one_or_none():
            return {"status": "success", "msg": "User logged in"}
        else:
            return {"status": "error", "msg": "Wrong credentials"}

