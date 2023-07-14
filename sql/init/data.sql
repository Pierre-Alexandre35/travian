INSERT INTO 
  master.tribes 
    (tribe)
  VALUES 
    ('roman'), 
    ('tetons'),
    ('gauls')
;

INSERT INTO 
  master.crop_types 
    (wood, clay, iron, corn)
  VALUES 
    (4,4,4,4), 
    (3,5,4,4),
    (4,4,5,3),
    (2,2,2,10),
    (3,3,5,5)
;

INSERT INTO 
  master.map 
    (x_pos, y_pos, crop_type)
  VALUES 
    (0,0,1), 
    (0,1,2),
    (1,0,1),
    (1,1,2),
    (2,0,3), 
    (2,1,2),
    (3,0,1),
    (3,1,4),
    (3,2,4)
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
  master.buildings_upgrades 
    (building_id, level, wood, clay, iron, corn, requirements_id)
  VALUES 
    ('done'), 
    ('in-progress')
;

/* example: requirements market requires 2 things to be build (level 1): main building level 3 and warehouse level 1*/
INSERT INTO 
  master.buildings_upgrades 
    (buildings_upgrade_id, required_building_id, required_building_level)
  VALUES 
    (1, 1, 3), /* condition 1: build type 1 must be level 3 */
    (1, 7, 1) /* condition 2: build type 7 must be level 1 */
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
  master.crops_distribution_types     (wood, clay, iron, corn)
  VALUES 
    (1, 1, 1, 15),
    (3, 3, 3, 9),
    (4, 4, 4, 6),
    (5, 4, 5, 4)
;
  


INSERT INTO
  master.crops_distribution_types     (distribution_type_id, position, crop_type, corn)
  VALUES 
    (3, 1, 1, 15),
    (3, 3, 3, 9),
    (3, 4, 4, 6),
    (3, 4, 5, 4),
    (3, 1, 1, 15),
    (3, 3, 3, 9),
    (3, 4, 4, 6),
    (3, 4, 5, 4),
    (3, 1, 1, 15),
    (3, 3, 3, 9),
    (3, 4, 4, 6),
    (3, 4, 5, 4)
;
  
