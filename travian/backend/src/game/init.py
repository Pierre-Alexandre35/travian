CREATE TABLE villages(
   village_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(100) NOT NULL,
   population INT,
   tribe_id INT,
   PRIMARY KEY(village_id),
   owner_id integer REFERENCES users (user_id),
   position_id integer REFERENCES position (position_id),
);


CREATE TABLE users(
   user_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
   uuid UUID UNIQUE,
   email VARCHAR(256) UNIQUE,
   active boolean,
   superuser boolean,
   created_on date,
   password bytea,
   password_salt bytea,
   PRIMARY KEY(user_id)
);

CREATE TABLE positions(
   position_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
   x_pos INT,
   y_pos INT,
   is_empty BOOLEAN,
   PRIMARY KEY (position_id),
   crop_type_id integer REFERENCES crop_types (crop_type_id),
);


CREATE TABLE crop_types(
   crop_type_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
   wood INT,
   clay INT,
   iron INT,
   corn INT,
   PRIMARY KEY (crop_type_id)
);
