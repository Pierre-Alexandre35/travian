from fastapi import APIRouter, Depends
from src.game.server import Server
from src.db.utils import get_db

admin_router = admin = APIRouter()


@admin.post("/server")
async def new_server(location: str, map_size: int, session=Depends(get_db)):
    """
    Test
    """
    current_server = Server(session=session, map_size=map_size)
    current_server.generate()
    current_server.deploy()
    return {"message": current_server.positions}
