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

INSERT INTO users (
  user_name,
  password
  ) VALUES (
    'test artist 1',
    'pudding'
    );

INSERT INTO tracks (
  track_name, 
  user_id, 
  cloudinary_url, 
  genres
  ) VALUES (
    'terra incognita',
    1,
    'cloudinaryurl',
    'rock'
    );

INSERT INTO tracks (
  track_name, 
  user_id, 
  cloudinary_url, 
  genres
  ) VALUES (
    'disembowelled with a soup spoon',
    1,
    'cloudinaryurl',
    'metal'
    );

INSERT INTO tracks (
  track_name, 
  user_id, 
  cloudinary_url, 
  genres
  ) VALUES (
    'paft dunk',
    2,
    'cloudinaryurl',
    'house'
    );

INSERT INTO tracks (
  track_name, 
  user_id, 
  cloudinary_url, 
  genres
  ) VALUES (
    'massive effect',
    3,
    'cloudinaryurl',
    'drum n bass'
    );