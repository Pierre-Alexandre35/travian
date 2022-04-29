CREATE TABLE PUBLIC.crop_types
  (
     crop_type_id INTEGER NOT NULL GENERATED always AS IDENTITY,
     wood         INTEGER NULL,
     clay         INTEGER NULL,
     iron         INTEGER NULL,
     corn         INTEGER NULL
  );

ALTER TABLE PUBLIC.crop_types
  ADD CONSTRAINT crop_types_pkey PRIMARY KEY (crop_type_id);

CREATE TABLE PUBLIC.map
  (
     x    INTEGER NOT NULL,
     y    INTEGER NOT NULL,
     TYPE INTEGER NOT NULL
  );

ALTER TABLE PUBLIC.map
  ADD CONSTRAINT map_pkey PRIMARY KEY (x);

CREATE TABLE PUBLIC.positions
  (
     position_id  INTEGER NOT NULL GENERATED always AS IDENTITY,
     x_pos        INTEGER NULL,
     y_pos        INTEGER NULL,
     is_empty     BOOLEAN NULL,
     crop_type_id INTEGER NULL
  );

ALTER TABLE PUBLIC.positions
  ADD CONSTRAINT positions_pkey PRIMARY KEY (position_id);

CREATE TABLE PUBLIC.tribes
  (
     tribe_id INTEGER NOT NULL GENERATED always AS IDENTITY,
     tribe    CHARACTER varying(20) NULL
  );

CREATE TABLE PUBLIC.users
  (
     user_id       INTEGER NOT NULL GENERATED always AS IDENTITY,
     uuid          UUID NULL,
     email         CHARACTER varying(256) NULL,
     active        BOOLEAN NULL,
     superuser     BOOLEAN NULL,
     created_on    DATE NULL,
     PASSWORD      BYTEA NULL,
     password_salt BYTEA NULL
  );

ALTER TABLE PUBLIC.users
  ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

CREATE TABLE PUBLIC.villages
  (
     village_id  INTEGER NOT NULL GENERATED always AS IDENTITY,
     name        CHARACTER varying(100) NOT NULL,
     population  INTEGER NULL,
     tribe_id    INTEGER NULL,
     owner_id    INTEGER NULL,
     position_id INTEGER NULL
  );

ALTER TABLE PUBLIC.villages
  ADD CONSTRAINT villages_pkey PRIMARY KEY (village_id); 