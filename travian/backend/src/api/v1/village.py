from fastapi import APIRouter, Request, Depends, Response, encoders


village_router = r = APIRouter()


@r.get(
    "/users",
)
async def users_list():
    """
    Get all users
    """
    return {"test": "just a test"}
