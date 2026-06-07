"""FocusFlow Backend - FastAPI application

This module exposes a small API to manage tasks stored in a Supabase
PostgreSQL database. It uses a connection pool from the database module.
"""

from __future__ import annotations

import os
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import fetch_all, fetch_one, execute, init_db, close_db

# Initialize FastAPI app
app = FastAPI(title="FocusFlow Backend")

# CORS: allow React dev server on localhost:3000
origins = ["https://focusflow-mvp.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TaskCreate(BaseModel):
    title: str
    details: str
    user_email: str


class TaskResponse(BaseModel):
    id: int
    title: str
    details: str
    completed: bool
    created_at: str


class TaskList(BaseModel):
    tasks: List[TaskResponse]


@app.on_event("startup")
async def on_startup():
    # Initialize the database pool on startup
    await init_db()


@app.on_event("shutdown")
async def on_shutdown():
    # Close the database pool on shutdown
    await close_db()

@app.get("/")
async def root():
    return {
        "message": "FocusFlow Backend is running",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}



from fastapi import Query

@app.get("/tasks", response_model=TaskList)
async def list_tasks(user_email: str = Query(...)) -> TaskList:
    rows = await fetch_all(
        """
        SELECT id, title, details, completed, created_at
        FROM tasks
        WHERE user_email = $1
        ORDER BY created_at DESC
        """,
        user_email
    )

    tasks = [
        TaskResponse(
            id=row["id"],
            title=row["title"],
            details=row["details"],
            completed=row["completed"],
            created_at=str(row["created_at"]),
        )
        for row in rows
    ]

    return TaskList(tasks=tasks)


@app.post("/tasks", response_model=TaskResponse)
async def create_task(payload: TaskCreate) -> TaskResponse:
    # Insert and return the created row
    row = await fetch_one(
        "INSERT INTO tasks (title, details, user_email, completed, created_at) VALUES ($1, $2, $3, false, NOW()) RETURNING id, title, details, completed, created_at,user_email",
        payload.title,
        payload.details,
        payload.user_email,
    )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to create task")
    return TaskResponse(
        id=row["id"],
        title=row["title"],
        details=row["details"],
        completed=row["completed"],
        created_at=str(row["created_at"]),
    )


@app.put("/tasks/{id}/complete", response_model=TaskResponse)
async def complete_task(id: int) -> TaskResponse:
    row = await fetch_one(
        "UPDATE tasks SET completed = true WHERE id = $1 RETURNING id, title, details, completed, created_at",
        id,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskResponse(
        id=row["id"],
        title=row["title"],
        details=row["details"],
        completed=row["completed"],
        created_at=str(row["created_at"]),
    )


@app.delete("/tasks/{id}")
async def delete_task(id: int) -> dict:
    row = await fetch_one("DELETE FROM tasks WHERE id = $1 RETURNING id", id)
    if row is None:
        raise HTTPException(status_code=404, detail="Task not found or already deleted")
    return {"status": "deleted", "id": row["id"]}


def _get_config_value(key: str, default=None):
    return os.environ.get(key, default)


if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)



