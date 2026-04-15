-- SQL script to initialise the simpsons_db database
-- Run this before the first application startup

CREATE DATABASE IF NOT EXISTS simpsons_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE simpsons_db;

-- The 'characters' table is auto-created by Hibernate (ddl-auto=update).
-- This script seeds initial data for quick testing.

INSERT INTO characters (name, alias, occupation, age, gender, family, description, image_url, first_appearance, created_at, updated_at)
VALUES
    ('Homer Simpson', 'Homer', 'Nuclear Safety Inspector', 39, 'Male', 'Simpson',
     'Padre de familia, aficionado a la cerveza Duff y las donas.',
     'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png',
     'Good Night (1989)', NOW(), NOW()),

    ('Marge Simpson', 'Marge', 'Ama de casa', 36, 'Female', 'Simpson',
     'Matriarca de la familia Simpson, conocida por su cabello azul.',
     'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png',
     'Good Night (1989)', NOW(), NOW()),

    ('Bart Simpson', 'El Barto', 'Estudiante', 10, 'Male', 'Simpson',
     'El travieso hijo mayor de la familia Simpson.',
     'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png',
     'Good Night (1989)', NOW(), NOW()),

    ('Lisa Simpson', 'Lisa', 'Estudiante', 8, 'Female', 'Simpson',
     'Prodigio musical e intelectual de la familia.',
     'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png',
     'Good Night (1989)', NOW(), NOW()),

    ('Maggie Simpson', 'Maggie', 'Bebé', 1, 'Female', 'Simpson',
     'La bebé de la familia que siempre chupa su chupete.',
     'https://upload.wikimedia.org/wikipedia/en/9/9d/Maggie_Simpson.png',
     'Good Night (1989)', NOW(), NOW()),

    ('Montgomery Burns', 'Señor Burns', 'Dueño de la Planta Nuclear', 104, 'Male', 'Burns',
     'El malvado jefe de Homer, el hombre más rico de Springfield.',
     'https://static.wikia.nocookie.net/lossimpson/images/9/9d/Charles_Montgomery_Burns.png/revision/latest?cb=20090227021502&path-prefix=es',
     'Simpson''s Roasting on an Open Fire (1989)', NOW(), NOW()),

    ('Ned Flanders', 'Neddie', 'Dueño de Leftorium', 60, 'Male', 'Flanders',
     'El amable y religioso vecino de los Simpson.',
     'https://static.wikia.nocookie.net/simpsons/images/8/84/Ned_Flanders.png/revision/latest?cb=20201222215900',
     'Simpson''s Roasting on an Open Fire (1989)', NOW(), NOW()),

    ('Apu Nahasapeemapetilon', 'Apu', 'Empleado del Kwik-E-Mart', 40, 'Male', 'Nahasapeemapetilon',
     'El hindú dueño de la tienda Kwik-E-Mart.',
     'https://static.wikia.nocookie.net/lossimpson/images/7/7d/Apu_Nahasapeemapetilon.png/revision/latest?cb=20111127113228&path-prefix=es',
     'The Telltale Head (1990)', NOW(), NOW());
