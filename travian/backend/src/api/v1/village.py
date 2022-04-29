from fastapi import APIRouter

village_router = village = APIRouter()


@village.get("/village")
async def new_village():
    return {"message": "this is a new village"}
