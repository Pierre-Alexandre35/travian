from src.db import schemas
from src.db.conn import Database


def create_coordonates(
    session: Database, position: schemas.map.MapPosition, crop_type_id: int
):
    sql = """
        INSERT INTO positions (x_pos, y_pos, is_empty, crop_type_id)
        VALUES (%s, %s, %s, %s)
        """
    params = (position.x_pos, position.y_pos, position.is_empty, crop_type_id)
    session.update_rows(sql, params)
    return None
