-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  rating VARCHAR(10) NOT NULL,
  runtime VARCHAR(10) NOT NULL,
  releaseDate DATE NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DELETE FROM movies;
ALTER TABLE movies AUTO_INCREMENT = 1;

INSERT INTO movies (title, genre, rating, runtime, releaseDate, description, image) VALUES
('Beyond Horizon', 'Sci-Fi', 'PG-13', '2h 18m', '2026-06-21',
 'From the visionary team behind some of the decade''s most ambitious science fiction comes Beyond Horizon, a breathtaking journey to the edge of existence itself.',
 '/assets/Beyond-Horizon.png'),

('The Lost Expedition', 'Adventure', 'PG-13', '2h 6m', '2026-07-05',
 'Deep in uncharted jungle, an expedition team discovers a temple no human has entered in a thousand years.',
 '/assets/expedition.jpg'),

('Midnight Promises', 'Romance', 'PG-13', '1h 52m', '2026-06-14',
 'Two strangers meet on the last train of the night and promise to find each other again exactly one year later.',
 '/assets/midnight.jpeg'),

('The Spark', 'Animation', 'PG', '1h 38m', '2026-06-28',
 'When the last firefly in the valley refuses to light, a young girl sets off across glowing fields and impossible forests to convince it the world is still worth shining for.',
 '/assets/spark.png'),

('Shadows of Crestwood', 'Horror', 'R', '1h 57m', '2026-10-11',
 'The town of Crestwood has a tradition no one talks about.',
 '/assets/shadows-crestwood.jpg'),

('Uncharted: Legacy of Thieves', 'Action', 'PG-13', '2h 10m', '2026-07-18',
 'A reluctant treasure hunter is pulled back into the world he left behind when the map his father died protecting finally surfaces.',
 '/assets/uncharted.jpeg');