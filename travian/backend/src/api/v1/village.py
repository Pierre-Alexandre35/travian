from fastapi import APIRouter

village_router = r = APIRouter()


@r.get("/")
async def home():
    """
    Test
    """
    return {"message": "hello village"}
