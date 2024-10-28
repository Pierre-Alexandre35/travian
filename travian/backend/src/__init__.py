from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from src.api.v1.auth import auth_router
from src.api.v1.village import village_router


def create_app() -> FastAPI:
    root_app = FastAPI(title="Travian API", version="0.1")

    root_app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173",
            "http://localhost:5500",
        ],  # Allows all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods
        allow_headers=["*"],  # Allows all headers
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

    @root_app.get("/", response_class=RedirectResponse)
    async def root():
        return "/docs"  # Redirect to the OpenAPI docs

    return root_app
