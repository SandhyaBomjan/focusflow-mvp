"""FocusFlow Backend - Database layer

This module provides a lightweight asyncpg-based connection pool and helper
functions to interact with the Supabase/PostgreSQL database. It reads the
DATABASE_URL from the environment (loaded from the project's .env file) and
exposes simple helpers to fetch and execute queries.
"""

from __future__ import annotations

import os
from typing import Optional, Any, List

import asyncio
import asyncpg
from dotenv import load_dotenv

# Load environment variables from the local .env file
load_dotenv()

# Internal global pool reference
_POOL = await asyncpg.create_pool(
    dsn=database_url,
    min_size=1,
    max_size=1
)


async def init_db() -> None:
    """Initialize the asyncpg connection pool using DATABASE_URL."""
    global _POOL
    if _POOL is not None:
        return
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set in the environment.")
    _POOL = await asyncpg.create_pool(dsn=database_url)


async def close_db() -> None:
    """Close the connection pool if it exists."""
    global _POOL
    pool = _POOL
    if pool is not None:
        await pool.close()
        _POOL = None


async def _get_pool() -> asyncpg.pool.Pool:
    """Return the active connection pool, initializing if needed."""
    global _POOL
    if _POOL is None:
        await init_db()
    if _POOL is None:
        raise RuntimeError("Database pool could not be initialized.")
    return _POOL


async def fetch_all(query: str, *args: Any) -> List[asyncpg.Record]:
    """Execute a query and return all rows."""
    pool = await _get_pool()
    async with pool.acquire() as conn:
        return await conn.fetch(query, *args)


async def fetch_one(query: str, *args: Any) -> Optional[asyncpg.Record]:
    """Execute a query and return a single row, or None if not found."""
    pool = await _get_pool()
    async with pool.acquire() as conn:
        return await conn.fetchrow(query, *args)


async def execute(query: str, *args: Any) -> str:
    """Execute a statement (INSERT/UPDATE/DELETE) and return status string."""
    pool = await _get_pool()
    async with pool.acquire() as conn:
        return await conn.execute(query, *args)


