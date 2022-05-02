from src.db.conn import Database
from src.db.schemas.villages import UserVillages, Village


def get_villages(session: Database, user_id: str) -> UserVillages:
    sql = """
        SELECT *
        FROM villages 
        WHERE owner_id = (%s)
        """
    params = [user_id]
    records = session.select_rows_dict_cursor(sql, params)
    villages = []
    for record in records:
        villages.append(
            Village(
                village_id=record[0],
                name=record[1],
                owner_id=record[2],
                location_id=record[3],
            )
        )
    return UserVillages(villages=villages)
