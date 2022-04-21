from fastapi import APIRouter
from src.game.server import generate_new_server

admin_router = admin = APIRouter()


@admin.post("/new-server")
async def new_server(size: int):
    """
    Test
    """
    return {"message": "hello admin"}
