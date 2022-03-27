from fastapi import APIRouter, Depends, HTTPException, status

auth_router = r = APIRouter()

@r.get("/register")
async def register():
    return {'e','eeee'}