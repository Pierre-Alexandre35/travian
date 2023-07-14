CREATE SCHEMA master;

CREATE SCHEMA transactions;

CREATE TABLE
  master.ressources_types (
    id serial NOT NULL,
    ressource VARCHAR(15),
    PRIMARY KEY (id)
);

CREATE TABLE
  master.tribes (
    id serial NOT NULL,
    tribe VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE
  master.buildings_status (
    id serial NOT NULL,
    status VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE
  master.map (
    id serial NOT NULL,
    x_pos integer NOT NULL,
    y_pos integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (x_pos, y_pos)
);

CREATE TABLE
  master.buildings (
    id serial NOT NULL,
    tribe_id integer NOT NULL,
    name VARCHAR(100),
    description VARCHAR(400),
    PRIMARY KEY (id),
    FOREIGN KEY (tribe_id) REFERENCES master.tribes(id)
);

CREATE TABLE
  master.buildings_positions (
    id serial NOT NULL,
    position_id serial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE
  master.warehouse_storage (
    id serial NOT NULL,
    level integer NOT NULL,
    max_storage INT NOT NULL
);

CREATE TABLE
  master.crop_production (
    id serial NOT NULL,
    crope_type_id integer NOT NULL,
    level INT NOT NULL,
    production INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (crope_type_id) REFERENCES master.ressources_types(id)
);

CREATE TABLE
  master.crop_positions (
    id serial NOT NULL,
    crop_type INT NOT NULL, 
    details VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (crop_type) REFERENCES master.ressources_types(id)
);

CREATE TABLE
  transactions.users (
    id serial NOT NULL,
    uuid uuid NOT NULL,
    email character varying (256) NOT NULL,
    active boolean NOT NULL,
    superuser boolean NOT NULL,
    created_on date NOT NULL,
    password bytea NOT NULL,
    password_salt bytea NOT NULL,
    tribe_id INT NOT NULL,
    UNIQUE (email),
    PRIMARY KEY (id),
    FOREIGN KEY (tribe_id) REFERENCES master.tribes(id)
);

CREATE TABLE
  transactions.villages (
    id serial NOT NULL,
    name VARCHAR(256) NOT NULL,
    population INT4 NOT NULL,
    owner_id INT NOT NULL,
    position_id INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (position_id),
    FOREIGN KEY (owner_id) REFERENCES transactions.users(id),
    FOREIGN KEY (position_id) REFERENCES master.map(id)
);

CREATE TABLE
  transactions.buildings (
    id serial NOT NULL,
    village_id integer NOT NULL,
    building_id integer NOT NULL,
    position_id integer NOT NULL,
    level INT2 NOT NULL,
    status integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (village_id) REFERENCES transactions.villages(id),
    FOREIGN KEY (status) REFERENCES master.buildings_status(id),
    FOREIGN KEY (building_id) REFERENCES master.buildings(id),
    FOREIGN KEY (position_id) REFERENCES master.buildings_positions(id)    
);

CREATE TABLE
  master.buildings_requirements (
    id serial NOT NULL,
    buildings_upgrade_id integer NOT NULL,
    required_building_id integer NOT NULL,
    required_building_level integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (buildings_upgrade_id) REFERENCES master.buildings(id),
    FOREIGN KEY (required_building_id) REFERENCES master.buildings(id)
);

CREATE TABLE
  master.buildings_upgrades (
    id serial NOT NULL,
    building_id integer NOT NULL,
    level INT2 NOT NULL,
    wood integer NOT NULL,
    clay integer NOT NULL,
    iron integer NOT NULL,
    corn integer NOT NULL,
    requirements_id integer REFERENCES master.buildings_requirements(id),
    PRIMARY KEY (id),
    FOREIGN KEY (building_id) REFERENCES master.buildings(id)   
  );

CREATE TABLE
  transactions.crops (
    id serial NOT NULL,
    village_id integer NOT NULL,
    position_id INT NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (position_id) REFERENCES  master.crop_positions(id),
    UNIQUE (village_id, position_id)
);

CREATE TABLE
  master.crop_upgrades_cost (
    id serial NOT NULL,
    crope_type_id integer NOT NULL,
    level INT NOT NULL,
    ressource_type INT NOT NULL,
    cost INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (crope_type_id) REFERENCES master.ressources_types(id),
    FOREIGN KEY (ressource_type) REFERENCES master.ressources_types(id)
);

CREATE TABLE
  transactions.ressources (
    id serial NOT NULL,
    village_id integer NOT NULL,
    ressource_id INT NOT NULL,
    amount INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (village_id) REFERENCES transactions.villages(id),
    FOREIGN KEY (ressource_id) REFERENCES master.ressources_types(id),
    UNIQUE (village_id, ressource_id)
);