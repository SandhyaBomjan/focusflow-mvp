"""FocusFlow Backend - Authentication (Supabase JWT support)

This module provides a lightweight JWT verifier that validates Supabase
GoTrue-issued tokens using the JWKS public keys exposed by Supabase.
This is intended as a production-ready building block for endpoints that
require authentication.
"""
from __future__ import annotations

import os
from typing import Dict

import jwt
from jwt import PyJWKClient
from fastapi import HTTPException


class SupabaseAuth:
    """
    JWT validator for Supabase GoTrue tokens.
    It fetches the JWKS from the Supabase project and uses RS256 to verify
    the token's signature.
    """
    def __init__(self, supabase_url: str):
        if not supabase_url:
            raise ValueError("SUPABASE_URL must be provided")
        self.jwk_client = PyJWKClient(f"{supabase_url.rstrip('/')}/.well-known/jwks.json")

    def verify(self, token: str) -> Dict:
        """
        Verify a JWT and return the decoded payload if valid.
        Raises HTTPException(401) if the token is invalid.
        """
        try:
            signing_key = self.jwk_client.get_signing_key_from_jwt(token).key
            payload = jwt.decode(token, signing_key, algorithms=["RS256"], options={"verify_aud": False})
            return payload
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid authentication")


# Simple FastAPI dependency example (optional for endpoints)
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """
    Dependency that returns the decoded token payload for the authenticated user.
    If credentials are missing or invalid, a 401 is raised.
    """
    supabase_url = os.getenv("SUPABASE_URL", "")
    auth = SupabaseAuth(supabase_url)
    return auth.verify(credentials.credentials)
