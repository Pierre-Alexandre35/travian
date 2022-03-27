<<<<<<< HEAD
from src.db.schemas.user import *
from src.core.security import *
from src.db import conn
from src.core.config import * 

db = conn.Database(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME)
hashed_pwd, salt = password_hash('200795')

raw_user = {'username': 'pierre', 'password': hashed_pwd, 'salt': salt}
structured_user = User(**raw_user)
sql = '''
   INSERT INTO userss (username, password, salt)
   VALUES (%s, %s, %s)'''
params = (structured_user.username, structured_user.password, structured_user.salt)

##db.update_rows(sql, params)

sql_2 = "SELECT * FROM userss WHERE username= 'pierre'"

retrived_user = db.select_rows_dict_cursor(sql_2)[0]

raw_user_2 = {'username': retrived_user[0], 'password': str(retrived_user[1]), 'salt': str(retrived_user[2])}
structured_user_2 = User(**raw_user)
print(password_verify(structured_user_2.password, structured_user_2.salt, '200795'))