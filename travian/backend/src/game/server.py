import random
from src.game.settings import CROP_TYPES


def generate_map(size):
    coordinates = []
    for x in range(-size, size + 1):
        for y in range(-size, size + 1):
            coordinates.append((x, y))
    return coordinates


def generate_crops():
    item = random.choice(tuple(CROP_TYPES))
    print(item)


def generate_new_server(map_size: int):
    new_map_coordinates = generate_map(map_size)
