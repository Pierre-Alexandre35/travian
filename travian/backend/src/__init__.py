from fastapi import FastAPI
from src.api.v1.village import village_router
from src.api.v1.auth import auth_router

# Globally accessible libraries
#db = SQLAlchemy()
#r = FlaskRedis()


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
    tags=["auth_router"],
    )
    @root_app.get("/")
    async def root():
        return {"message": "Hello World"}
    return root_app