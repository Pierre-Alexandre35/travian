from src.db.conn import Database
from src.db.schemas import villages as village_schemas


def get_user_villages(session: Database, user_id: int) -> village_schemas.UserVillages:
    print(user_id)
    sql = """
        SELECT 
          villages.id,
          villages.name,
          villages.owner_id,
          villages.position_id,
          villages.population
        FROM
          transactions.villages as villages
        LEFT JOIN 
          master.map as map 
          ON villages.position_id = map.id
        WHERE
          villages.owner_id = (%s)
        """
    params = [user_id]
    records = session.select_rows_dict_cursor(sql, params)
    user_villages = []
    for record in records:
        user_villages.append(
            village_schemas.Village(
                village_id=record[0],
                name=record[1],
                owner_id=record[2],
                position_id=record[3],
                population=record[4],
            )
        )
    return village_schemas.UserVillages(villages=user_villages)


def create_village(
    session: Database, id: str, new_village: village_schemas.Village
) -> int:
    # SQL statement with the RETURNING clause to get the newly generated id
    sql = """
        INSERT INTO transactions.villages (name, population, owner_id, position_id) 
        VALUES (%s, %s, %s, %s)
        RETURNING id
        """
    params = (
        new_village.name,
        new_village.population,
        id,
        new_village.position_id,
    )
    # Execute the SQL and fetch the id of the newly inserted row
    new_village_id = session.update_rows(sql, params, fetch=True)
    return village_schemas.Village(
        village_id=new_village_id,
        name=new_village.name,
        owner_id=id,
        position_id=new_village.position_id,
        population=new_village.population,
    )


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
