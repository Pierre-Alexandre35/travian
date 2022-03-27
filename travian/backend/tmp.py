from src.db import conn
from src.core import config

def tmp():
    db = conn.Database(config.DATABASE_HOST, 
              config.DATABASE_USERNAME, 
              config.DATABASE_PASSWORD, 
              config.DATABASE_PORT, 
              config.DATABASE_NAME)
    db.connect()
    return db.select_rows_dict_cursor("SELECT * FROM crop_types")
print(tmp())