from fastapi.responses import JSONResponse
from typing import Any


def cached_json_response(
    content: Any, max_age: int = 3600, etag: str = None
) -> JSONResponse:
    headers = {"Cache-Control": f"public, max-age={max_age}"}
    if etag:
        headers["ETag"] = etag
    return JSONResponse(content=content, headers=headers)
