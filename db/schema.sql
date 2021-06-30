CREATE DATABASE drum_beats;

\c drum_beats;

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    track_name TEXT,
    user_id INT, 
    cloudinary_url TEXT,
    genres TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT,
    password TEXT
);

INSERT INTO users (user_name, password) VALUES ('test artist 1', 'pudding');

INSERT INTO tracks (track_name, user_id, cloudinary_url, genres)
VALUES ('test name 1', 1, 'test_url_1', 'rock,metal,country');