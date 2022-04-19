from fastapi import FastAPI
from src.api.v1.village import village_router
from src.api.v1.auth import auth_router
from src.core.config import *


def create_app() -> FastAPI:
    root_app = FastAPI()
    root_app.include_router(
        village_router,
        prefix="/api/v1",
        tags=["village"],
    )
    root_app.include_router(
        auth_router,
        prefix="/api/v1",
        tags=["auth"],
    )

    @root_app.get("/")
    async def root():
        return {"message": "Hello World"}

    @root_app.middleware("http")
    async def db_session_middleware(request: Request, call_next):
        request.state.db = SessionLocal()
        response = await call_next(request)
        request.state.db.close()
        return response

    return root_app
