from db.schemas.user import *
from core.security import *

hashed_pwd, salt = password_hash('200795')

raw_user = {'id': 1, 'email': 'jean@gmail.com', 'pwd': hashed_pwd, 'salt': salt}
structured_user = User(**raw_user)
print(structured_user.pwd)