/* please choose your tribe */
SELECT
  id,
  tribe
FROM 
  master.tribes


INSERT INTO 
  transactions.users 
    (uuid, email, active, superuser, created_on, password, password_salt, tribe_id)
  VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11','EMAIL HERE',TRUE, FALSE, '2023-06-30', '1234', 'sdJ^728ddHdy736', 1)

/* please select your location - display available spots*/
SELECT 
  map.id, 
  map.x_pos, 
  map.y_pos, 
  map.crop_type 
FROM 
  master.map as map 
  LEFT JOIN transactions.villages as villages 
  ON map.id = villages.id 
    WHERE villages.id IS NULL


/* user (user_id 1) is selecting location 4*/


INSERT INTO 
  transactions.villages 
    (name, population, owner_id, position_id)
  VALUES 
    ('rome', 50, 1, 4);


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
    (name, population, owner_id, position_id)
  VALUES 
    ('paris', 50, 1, 2);


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
  id,
  x_pos,
  y_pos,
  crop_type,
  SQRT(POWER((x_pos - (-1)), 2) + POWER((y_pos - (-1)), 2)) AS distance
FROM
  master.map
    LEFT JOIN transactions.villages as villages 
  ON map.id = villages.id 
    WHERE villages.id IS NULL
ORDER BY
  distance ASC;


/* query to count production of each ressource type */
SELECT
   crop_type,
   SUM(production)
FROM transactions.crops as crops
  LEFT JOIN master.crop_positions as pos 
    ON crops.position_id = pos.id
  LEFT JOIN master.crop_production as production 
    ON crops.level = production.level AND pos.crop_type = production.crope_type_id
 WHERE crops.village_id = 1
 GROUP BY crop_type






