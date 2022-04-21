from random import random
from fastapi import APIRouter
import random

village_router = village = APIRouter()


@village.post("/new-village")
async def new_village():
    return {"message": 1}
