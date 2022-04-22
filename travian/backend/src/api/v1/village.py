from fastapi import APIRouter

village_router = village = APIRouter()


@village.post("/new-village")
async def new_village():
    return {"message": "to-do"}
