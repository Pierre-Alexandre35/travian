# Client-side caching (avoiding full response re-downloads)
# And Conditional requests (If-None-Match) to save bandwidth

import hashlib
import json
from typing import Any


def compute_etag(data: Any) -> str:
    """Compute an ETag hash from JSON-serializable data."""
    json_str = json.dumps(data, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(json_str.encode("utf-8")).hexdigest()
