CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  genre TEXT[] NOT NULL,
  rating FLOAT CHECK (rating >= 0 AND rating <= 10),
  poster_url TEXT,
  description TEXT,
  duration INT NOT NULL
);