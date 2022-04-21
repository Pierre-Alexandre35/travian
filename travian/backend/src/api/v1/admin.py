from fastapi import APIRouter

admin_router = admin = APIRouter()


@admin.post("/overview")
async def admin():
    """
    Test
    """
    return {"message": "hello admin"}
