\c travian;

INSERT INTO
  master.tribes (tribe)
VALUES
  ('roman'),
  ('tetons'),
  ('gauls');

INSERT INTO
  master.ressources_types (ressource)
VALUES
  ('wood'),
  ('clay'),
  ('iron'),
  ('corn');

INSERT INTO
  master.construction_status (status)
VALUES
  ('done'),
  ('in-progress'),
  ('cancelled');

INSERT INTO
  master.map (x_pos, y_pos)
VALUES
  (0, 0),
  (0, 1),
  (1, 0),
  (1, 1),
  (2, 0),
  (2, 1),
  (3, 0),
  (3, 1),
  (3, 2);

INSERT INTO
  master.buildings (tribe_id, name, description)
VALUES
  (
    1,
    'warehouse',
    'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'
  ),
  (
    2,
    'warehouse',
    'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'
  ),
  (
    3,
    'warehouse',
    'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'
  ),
  (
    1,
    'granary',
    'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'
  ),
  (
    2,
    'granary',
    'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'
  ),
  (
    3,
    'granary',
    'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'
  ),
  (
    1,
    'main building',
    'Your village main building.'
  ),
  (
    2,
    'main building',
    'Your village main building.'
  ),
  (
    3,
    'main building',
    'Your village main building.'
  ),
  (
    1,
    'marketplace',
    'Place to seel, buy and exchange ressources.'
  ),
  (
    2,
    'marketplace',
    'Place to seel, buy and exchange ressources.'
  ),
  (
    3,
    'marketplace',
    'Place to seel, buy and exchange ressources.'
  );

INSERT INTO
  master.buildings_status (status)
VALUES
  ('done'),
  ('in-progress');

INSERT INTO
  master.crop_production (ressource_type_id, level, production)
VALUES
  (1, 0, 0),
  (2, 0, 0),
  (3, 0, 0),
  (4, 0, 0),
  (1, 1, 25),
  (2, 1, 25),
  (3, 1, 25),
  (4, 1, 25),
  (1, 2, 30),
  (2, 2, 32),
  (3, 2, 34),
  (4, 2, 30),
  (1, 3, 40),
  (2, 3, 44),
  (3, 3, 56),
  (4, 3, 50);

INSERT INTO
  master.warehouse_storage (level, max_storage)
VALUES
  (1, 1000),
  (2, 2000),
  (3, 3000),
  (4, 4000),
  (5, 6000),
  (6, 9000);

INSERT INTO
  master.buildings_requirements (
    buildings_upgrade_id,
    required_building_id,
    required_building_level
  )
VALUES
  (1, 4, 10),
  (1, 2, 1);

INSERT INTO
  master.buildings_upgrades (
    building_id,
    level,
    wood,
    clay,
    iron,
    corn,
    requirements_id
  )
VALUES
  (1, 1, 100, 150, 80, 200, NULL),
  (2, 1, 100, 150, 80, 200, NULL),
  (3, 1, 100, 150, 80, 200, NULL),
  (10, 1, 600, 600, 550, 400, 1),
  (11, 1, 600, 600, 550, 400, 1),
  (12, 1, 600, 600, 550, 400, 1);

INSERT INTO
  master.crop_positions (ressource_type, details)
VALUES
  (1, 'north'),
  (1, 'north'),
  (2, 'north'),
  (2, 'north'),
  (3, 'south'),
  (3, 'south'),
  (4, 'south'),
  (4, 'south'),
  (1, 'east'),
  (1, 'east'),
  (2, 'east'),
  (2, 'east'),
  (3, 'west'),
  (3, 'west'),
  (4, 'west'),
  (4, 'west'),
  (4, 'west'),
  (4, 'west');

INSERT INTO
  master.crop_upgrades (
    ressource_type_id,
    level,
    population_increase,
    duration_in_seconds
  )
VALUES
  (1, 1, 5, 60),
  (1, 2, 7, 90),
  (1, 3, 10, 150),
  (2, 1, 6, 70),
  (2, 2, 8, 100),
  (2, 3, 12, 200),
  (3, 1, 4, 50),
  (3, 2, 5, 80),
  (3, 3, 6, 100),
  (4, 1, 1, 50),
  (4, 2, 2, 66),
  (4, 3, 3, 80);

INSERT INTO
  master.crop_upgrades_cost (crop_upgrades_id, ressource_type_id, cost)
VALUES
  (1, 1, 150),
  (1, 2, 130),
  (1, 3, 110),
  (1, 4, 100),
  (2, 1, 250),
  (2, 2, 230),
  (2, 3, 210),
  (2, 4, 200),
  (3, 1, 350),
  (3, 2, 330),
  (3, 3, 310),
  (3, 4, 300),
  (4, 1, 110),
  (4, 2, 150),
  (4, 3, 90),
  (4, 4, 80),
  (5, 1, 210),
  (5, 2, 250),
  (5, 3, 190),
  (5, 4, 180),
  (6, 1, 310),
  (6, 2, 350),
  (6, 3, 290),
  (6, 4, 280),
  (7, 1, 140),
  (7, 2, 110),
  (7, 3, 100),
  (7, 4, 80),
  (8, 1, 240),
  (8, 2, 210),
  (8, 3, 200),
  (8, 4, 180),
  (9, 1, 340),
  (9, 2, 310),
  (9, 3, 300),
  (9, 4, 280),
  (10, 1, 50),
  (10, 2, 50),
  (10, 3, 50),
  (10, 4, 50),
  (11, 1, 100),
  (11, 2, 100),
  (11, 3, 100),
  (11, 4, 100),
  (12, 1, 200),
  (12, 2, 200),
  (12, 3, 200),
  (12, 4, 200);