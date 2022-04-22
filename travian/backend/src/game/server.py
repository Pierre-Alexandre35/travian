from datetime import datetime
from random import randint
from src.db.conn import Database
from src.db.schemas.map import MapPosition
from src.db.crud.map import create_coordonates
from src.game.settings import CROP_TYPES


class Server:
    def __init__(self, session: Database, map_size: int, time=datetime.utcnow()):
        self.session = session
        self.map_size = map_size
        self.crop_types = CROP_TYPES
        self.age = time
        self.location = "EU-WEST-1"
        self.positions = []

    def __select_random_crop_type(self) -> int:
        return randint(1, len(self.crop_types))

    def __initialize_map_coordinates(self) -> str:
        for x in range(-self.map_size, self.map_size + 1):
            for y in range(-self.map_size, self.map_size + 1):
                crop_type_id = self.__select_random_crop_type()
                self.positions.append(
                    (MapPosition(x_pos=x, y_pos=y, is_empty=True), crop_type_id)
                )
        return "ok"

    def generate(self):
        self.__initialize_map_coordinates()

    def deploy(self):
        if not self.positions:
            self.generate()
        for positon in self.positions:
            create_coordonates(self.session, positon[0], positon[1])
