INSERT INTO 
  master.tribes 
    (tribe)
  VALUES 
    ('roman'), 
    ('tetons'),
    ('gauls')
;

INSERT INTO
  master.ressources_types
    (ressource)
  VALUES 
    ('wood'),
    ('clay'),
    ('iron'),
    ('corn')
;

INSERT INTO 
  master.map 
    (x_pos, y_pos)
  VALUES 
    (0,0), 
    (0,1),
    (1,0),
    (1,1),
    (2,0), 
    (2,1),
    (3,0),
    (3,1),
    (3,2)
;

INSERT INTO 
  master.buildings 
    (tribe_id, name, description)
  VALUES 
    (1, 'warehouse', 'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'), 
    (2, 'warehouse', 'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'),
    (3, 'warehouse', 'The resources wood, clay and iron are stored in your Warehouse. By increasing its level you increase your Warehouse capacity. After building one Warehouse level 20, additional Warehouses can be built.'), 
    (1, 'granary', 'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'), 
    (2, 'granary', 'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'),
    (3, 'granary', 'Crop produced by your Croplands is stored in the Granary. By increasing its level, you increase the Granary capacity. After building up one Granary to level 20, additional Granaries can be built.'),
    (1, 'main building', 'Your village main building.'), 
    (2, 'main building', 'Your village main building.'),
    (3, 'main building', 'Your village main building.'),
    (1, 'marketplace', 'Place to seel, buy and exchange ressources.'), 
    (2, 'marketplace', 'Place to seel, buy and exchange ressources.'),
    (3, 'marketplace', 'Place to seel, buy and exchange ressources.') 
;

INSERT INTO 
  master.buildings_status 
    (status)
  VALUES 
    ('done'), 
    ('in-progress')
;

INSERT INTO 
  master.crop_production 
    (crope_type_id, level, production)
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
    (4, 3, 50)
;

INSERT INTO 
  master.warehouse_storage 
    (level, max_storage)
  VALUES 
    (1, 1000),
    (2, 2000),
    (3, 3000),
    (4, 4000),
    (5, 6000),
    (6, 9000)
;  

INSERT INTO 
  master.buildings_requirements 
    (buildings_upgrade_id, required_building_id, required_building_level)
  VALUES 
    (1, 4, 10),
    (1, 2, 1)
;

INSERT INTO 
  master.buildings_upgrades 
    (building_id, level, wood, clay, iron, corn, requirements_id)
  VALUES 
    (1, 1, 100, 150, 80, 200, NULL),
    (2, 1, 100, 150, 80, 200, NULL),
    (3, 1, 100, 150, 80, 200, NULL),
    (10, 1, 600, 600, 550, 400, 1),
    (11, 1, 600, 600, 550, 400, 1),
    (12, 1, 600, 600, 550, 400, 1)
;

INSERT INTO
  master.crop_positions     
    (crop_type, details)
  VALUES 
    (1,'north'),
    (1,'north'),
    (2,'north'),
    (2,'north'),
    (3,'south'),
    (3,'south'),
    (4,'south'),
    (4,'south'),
    (1,'east'),
    (1,'east'),
    (2,'east'),
    (2,'east'),
    (3,'west'),
    (3,'west'),
    (4,'west'),
    (4,'west'),
    (4,'west'),
    (4,'west')
;

INSERT INTO
  transactions.crops  
    (village_id, position_id, level)
  VALUES 
    (1, 1, 0),
    (1, 2, 0),
    (1, 3, 0),
    (1, 4, 0),
    (1, 5, 0),
    (1, 6, 0),
    (1, 7, 0),
    (1, 8, 0),
    (1, 9, 0),
    (1, 10, 0),
    (1, 11, 0),
    (1, 12, 0),
    (1, 13, 0),
    (1, 14, 0),
    (1, 15, 0),
    (1, 16, 0),
    (1, 17, 0),
    (1, 18, 0)
;

INSERT INTO
  master.crop_upgrades_cost     
    (crope_type_id, level, ressource_type, cost)
  VALUES 
    (1, 1, 1, 150),
    (1, 1, 2, 130),
    (1, 1, 3, 110),
    (1, 1, 4, 100),
    (1, 2, 1, 250),
    (1, 2, 2, 230),
    (1, 2, 3, 210),
    (1, 2, 4, 200),
    (1, 3, 1, 350),
    (1, 3, 2, 330),
    (1, 3, 3, 310),
    (1, 3, 4, 300),
    (2, 1, 1, 110),
    (2, 1, 2, 150),
    (2, 1, 3, 90),
    (2, 1, 4, 80),
    (2, 2, 1, 210),
    (2, 2, 2, 250),
    (2, 2, 3, 190),
    (2, 2, 4, 180),
    (2, 3, 1, 310),
    (2, 3, 2, 350),
    (2, 3, 3, 290),
    (2, 3, 4, 280),
    (3, 1, 1, 140),
    (3, 1, 2, 110),
    (3, 1, 3, 100),
    (3, 1, 4, 80),
    (3, 2, 1, 240),
    (3, 2, 2, 210),
    (3, 2, 3, 200),
    (3, 2, 4, 180),
    (3, 3, 1, 340),
    (3, 3, 2, 310),
    (3, 3, 3, 300),
    (3, 3, 4, 280),
    (4, 1, 1, 50),
    (4, 1, 2, 50),
    (4, 1, 3, 50),
    (4, 1, 4, 50),
    (4, 2, 1, 100),
    (4, 2, 2, 100),
    (4, 2, 3, 100),
    (4, 2, 4, 100),
    (4, 3, 1, 200),
    (4, 3, 2, 200),
    (4, 3, 3, 200),
    (4, 3, 4, 200)
;

