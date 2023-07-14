

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
  *
FROM 
  master.map
WHERE village_id IS NULL


/* user (user_id 1) is selecting location 4*/


INSERT INTO 
  transactions.villages 
    (name, population, owner_id, position_id)
  VALUES 
    ('rome', 50, 1, 4);



/* adding second user  */

INSERT INTO 
  transactions.users 
    (uuid, email, active, superuser, created_on, password, password_salt, tribe_id)
  VALUES 
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11','email here',TRUE, FALSE, '2023-07-02', 'sdads', 'JddJ^dsds', 2)



/* find all empty spots  */
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


/* query to find the nearest free villages */
SELECT
  map.id,
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



