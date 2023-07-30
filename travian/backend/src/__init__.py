from fastapi import FastAPI, Depends
from src.api.v1.village import village_router
from src.api.v1.auth import auth_router
from src.core.auth import get_current_user
from src.core.config import *
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    root_app = FastAPI()

    root_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
    )
    
    root_app.include_router(
        auth_router,
        prefix="/api/v1",
        tags=["auth"],
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
