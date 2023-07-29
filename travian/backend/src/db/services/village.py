from src.db.conn import Database
from src.db.schemas import villages as village_schemas


def get_villages(session: Database, id: str) -> village_schemas.UserVillages:
    sql = """
        SELECT *
        FROM villages 
        WHERE owner_id = (%s)
        """
    params = [id]
    records = session.select_rows_dict_cursor(sql, params)
    user_villages = []
    for record in records:
        user_villages.append(
            village_schemas.Village(
                village_id=record[0],
                name=record[1],
                owner_id=record[2],
                location_id=record[3],
            )
        )
    return village_schemas.UserVillages(villages=user_villages)


def create_village(
    session: Database, id: str, new_village: village_schemas.Village
):
    sql = """
        INSERT INTO villages (name, population, owner_id, position_id) 
        VALUES (%s, %s, %s, %s)
        """
    params = (
        new_village.name,
        new_village.population,
        id,
        new_village.position_id,
    )
    session.update_rows(sql, params)
    return "True"


def get_village_infos(
    village_id: str,
    session: Database,
):
    sql = """
        SELECT name, population, owner_id, position_id 
        FROM villages 
        WHERE village_id = (%s)
        """
    params = [village_id]
    records = session.select_rows_dict_cursor(sql, params)
    return village_schemas.VillageInfo(
        name=records[0][0],
        population=records[0][1],
        owner_id=records[0][2],
        location_id=records[0][3],
    )
