/* please choose your tribe */
SELECT
  id,
  tribe
FROM 
  master.tribes
;


INSERT INTO 
  transactions.users 
    (uuid, email, active, superuser, created_on, password, password_salt, tribe_id)
  VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11','EMAIL HERE',TRUE, FALSE, '2023-06-30', '1234', 'sdJ^728ddHdy736', 1)
;

/* please select your location - display available spots*/
SELECT 
  map.id, 
  map.x_pos, 
  map.y_pos
FROM 
  master.map as map 
  LEFT JOIN transactions.villages as villages 
  ON map.id = villages.id 
    WHERE villages.id IS NULL
;


/* user (user_id 1) is selecting location 4*/
INSERT INTO 
  transactions.villages 
    (name, population, owner_id, position_id)
  VALUES 
    ('rome', 50, 1, 4);
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

/* user (user_id 1) which has village id 1 set up village ressources 4*/
INSERT INTO
  transactions.ressources 
    (village_id, ressource_id, amount)
  VALUES 
    (1, 1, 1000),
    (1, 2, 1000),
    (1, 3, 1000),
    (1, 4, 1000)
;


/* one user (id 1) creating a new village at position 1 */
INSERT INTO 
  transactions.villages 
    (name, population, owner_id, position_id, population)
  VALUES 
    ('paris', 50, 1, 2, 500);


/* get the list of all villages for user 1 */
SELECT
  *
FROM
  transactions.villages as villages
LEFT JOIN master.map as map
  ON villages.position_id = map.id
WHERE
  villages.owner_id = 1


/* query to find the nearest villages */
SELECT
  villages.id,
  x_pos,
  y_pos,
  SQRT(POWER((x_pos - (-1)), 2) + POWER((y_pos - (-1)), 2)) AS distance
FROM
  master.map
    LEFT JOIN transactions.villages as villages 
  ON map.id = villages.id 
    WHERE villages.id IS NULL
ORDER BY
  distance ASC;


/* query to get the level and productio level of each crop in the village 2*/
SELECT
   crops.village_id, 
   crops.position_id,
   pos.ressource_type,
   crops.level,
   prod.production
FROM transactions.crops as crops
  LEFT JOIN master.crop_positions as pos 
    ON crops.position_id = pos.id
   LEFT JOIN  master.crop_production as prod 
    ON prod.ressource_type_id = pos.ressource_type AND crops.level = prod.level
 WHERE village_id = 1
		

/* query to count production of each ressource type */
SELECT
   ressource_type,
   SUM(production)
FROM transactions.crops as crops
  LEFT JOIN master.crop_positions as pos 
    ON crops.position_id = pos.id
  LEFT JOIN master.crop_production as production 
    ON crops.level = production.level AND pos.ressource_type = production.ressource_type_id
 WHERE crops.village_id = 1
 GROUP BY ressource_type




/* upgrade a crop */

    
/*  I am user 1 for village 1, I want to upgrade my crop at position 6 */
  
  
  SELECT 
    *
  FROM transactions.crops AS crops 
  LEFT JOIN master.crop_positions AS pos 
    ON crops.position_id = pos.id
 LEFT JOIN master.crop_upgrades AS upgrades 
   ON pos.ressource_type = upgrades.ressource_type_id 
 LEFT JOIN master.crop_upgrades_cost AS upgrades_cost 
   ON upgrades.id = upgrades_cost.crop_upgrades_id 
 WHERE crops.village_id = 1 
 AND crops.position_id = 6
 AND upgrades.level = crops.level +1




