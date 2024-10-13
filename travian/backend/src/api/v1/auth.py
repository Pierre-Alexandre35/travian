from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from src.core.auth import sign_up_new_user, authenticate_user
from src.core.security import create_access_token
from src.db.utils import get_db

auth_router = auth = APIRouter()


@auth.post("/register")
async def register(
    session=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    new_user = sign_up_new_user(
        session, email=form_data.username, password=form_data.password
    )
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"id": new_user.id, "mail": new_user.email},
        expires_delta=timedelta(minutes=30),
    )
    return {"access_token": access_token, "token_type": "bearer"}

@auth.get("/me")
async def me():
    return "hello myself"

@auth.post("/token")
async def login(
    response: Response,
    session=Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = authenticate_user(
        session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"id": user.id, "email": user.email},
        expires_delta=timedelta(
            minutes=30,
        ),
    )
    response.set_cookie(
        key="access_token", value=f"Bearer {access_token}", httponly=True
    )  # set HttpOnly cookie in response
    return {"access_token": access_token, "token_type": "bearer"}