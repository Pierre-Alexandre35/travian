from fastapi import FastAPI, Depends
from src.api.v1.village import village_router
from src.api.v1.auth import auth_router
from src.api.v1.admin import admin_router
from src.core.auth import get_current_user
from src.core.config import *


def create_app() -> FastAPI:
    root_app = FastAPI()
    root_app.include_router(
        auth_router,
        prefix="/api/v1",
        tags=["auth"],
    )
    root_app.include_router(
        admin_router,
        prefix="/api/v1",
        tags=["admin"],
        dependencies=[Depends(get_current_user)],
    )
    root_app.include_router(
        village_router,
        prefix="/api/v1",
        tags=["village"],
    )

    @root_app.get("/")
    async def root():
        return {"message": "Hello World"}

    return root_app
