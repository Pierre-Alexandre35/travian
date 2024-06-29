from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from src.core.auth import sign_up_new_user, authenticate_user
from src.core.security import create_access_token
from src.db.utils import get_db
from pydantic import BaseModel

auth_router = auth = APIRouter()

class AuthRequest(BaseModel):
    username: str
    password: str


@auth.post("/register")
async def register(
    request: AuthRequest,
    session=Depends(get_db)
):
    new_user = sign_up_new_user(
        session, email=request.username, password=request.password
    )
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"id": new_user.id, "email": new_user.email},
        expires_delta=timedelta(minutes=30),
    )
    return {"access_token": access_token, "token_type": "bearer"}

@auth.post("/token")
async def login(
    response: Response,
    request: AuthRequest,
    session=Depends(get_db)
):
    user = authenticate_user(
        session, email=request.username, password=request.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"id": user.id, "email": user.email},
        expires_delta=timedelta(minutes=30),
    )
    print(user)
    response.set_cookie(
        key="access_token", value=f"Bearer {access_token}", httponly=True
    )  # set HttpOnly cookie in response
    return {"access_token": access_token, "token_type": "bearer"}