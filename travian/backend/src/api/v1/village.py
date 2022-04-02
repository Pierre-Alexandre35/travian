from fastapi import APIRouter

village_router = r = APIRouter()


@r.get("/")
async def home():
    """
    Hello World
    """
    return {"message": "hello user"}
