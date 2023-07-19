/* please choose your tribe */
SELECT
  id,
  tribe
FROM 
  master.tribes
;

/* user registration informations  */
INSERT INTO 
  transactions.users 
    (uuid, email, active, superuser, created_on, password, password_salt, tribe_id)
  VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11','EMAIL HERE',TRUE, FALSE, '2023-06-30', '1234', 'sdJ^728ddHdy736', 1)
;

/* please select your first village location - display available locations */
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

/* village 1 crops production init */
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

/* village 1 ressources init */
INSERT INTO
  transactions.ressources 
    (village_id, ressource_id, amount)
  VALUES 
    (1, 1, 1000),
    (1, 2, 1000),
    (1, 3, 1000),
    (1, 4, 1000)
;

/* transaction : user 1 on his first village (village_id = 1) wants to improve one one his wood crop from level 0 to 1 */
/* step 1: find all locations IDs where there is wood (ressource type 1) */
SELECT 
  crops.position_id,
  crops.level,
  positions.ressource_type,
  positions.details
FROM
  transactions.crops as crops
LEFT JOIN master.crop_positions as positions ON crops.position_id = positions.id
WHERE village_id = 1
AND positions.ressource_type = 1


/* step 2: check the time, cost of upgrade the spot 9 (ressource type 1) from level 0 to 1 */
SELECT 
  crops.position_id,
  crops.level,
  positions.ressource_type,
  positions.details,
  upgrades.level,
  upgrades.population_increase,
  upgrades.duration_in_seconds,
  upgrades_cost.ressource_type_id,
  upgrades_cost.cost
FROM
  transactions.crops as crops
LEFT JOIN master.crop_positions as positions ON crops.position_id = positions.id
LEFT JOIN master.crop_upgrades as upgrades ON positions.ressource_type = upgrades.ressource_type_id
LEFT JOIN master.crop_upgrades_cost as upgrades_cost ON upgrades.id = upgrades_cost.crop_upgrades_id
WHERE village_id = 1
AND crops.position_id = 9
AND upgrades.level = crops.level + 1



/* step 3: check if we have enough ressource for the upgrade */
SELECT 
  crops.position_id,
  crops.level as current_level,
  upgrades.level as target_level,
  positions.ressource_type,
  upgrades.population_increase,
  upgrades.duration_in_seconds,
  upgrades_cost.ressource_type_id cost_ressource_type,
  upgrades_cost.cost cost_amount,
  user_ressouces.amount as user_amount
FROM
  transactions.crops as crops
LEFT JOIN master.crop_positions as positions ON crops.position_id = positions.id
LEFT JOIN master.crop_upgrades as upgrades ON positions.ressource_type = upgrades.ressource_type_id
LEFT JOIN master.crop_upgrades_cost as upgrades_cost ON upgrades.id = upgrades_cost.crop_upgrades_id
LEFT JOIN transactions.ressources as user_ressouces ON user_ressouces.village_id = crops.village_id AND user_ressouces.ressource_id =  upgrades_cost.ressource_type_id
WHERE crops.village_id = 1
AND crops.position_id = 9
AND upgrades.level = crops.level + 1
;

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
;
