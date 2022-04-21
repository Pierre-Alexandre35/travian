from src.db.conn import Database


def get_villages(session: Database, uuid: str):
    sql = """
        SELECT *
        FROM villages 
        WHERE owner_id = (%s)
        """
    params = [uuid]
    records = session.select_rows_dict_cursor(sql, params)
    return record[0]
