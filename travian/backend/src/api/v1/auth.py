from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from src.core.auth import sign_up_new_user, authenticate_user, get_current_user
from src.core.security import create_access_token
from src.db.utils import get_db

auth_router = r = APIRouter()


@r.post("/register")
async def register(
    session=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    new_user = sign_up_new_user(session, form_data.username, form_data.password)
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": new_user.username},
        expires_delta=timedelta(minutes=30),
    )
    return {"access_token": access_token, "token_type": "bearer"}


@r.post("/token")
async def login(
    session=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(
            minutes=30,
        ),
    )
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}


@r.get("/users/me")
async def user_me(current_user=Depends(get_current_user)):
    """
    Get own user
    """

    return str(1)
