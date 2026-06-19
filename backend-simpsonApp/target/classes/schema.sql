CREATE TABLE IF NOT EXISTS characters (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name             VARCHAR(100)  NOT NULL,
    alias            VARCHAR(100),
    occupation       VARCHAR(100),
    age              INTEGER,
    gender           VARCHAR(20),
    family           VARCHAR(100),
    description      TEXT,
    image_url        TEXT,
    first_appearance VARCHAR(100),
    created_at       TIMESTAMP,
    updated_at       TIMESTAMP
);
