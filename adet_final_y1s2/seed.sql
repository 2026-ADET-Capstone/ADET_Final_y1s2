DELETE FROM movies;
ALTER TABLE movies AUTO_INCREMENT = 1;

INSERT INTO movies (title, genre, rating, runtime, releaseDate, description, image) VALUES
('Beyond Horizon', 'Sci-Fi', 'PG-13', '2h 18m', '2026-06-21',
 'From the visionary team behind some of the decade''s most ambitious science fiction comes Beyond Horizon, a breathtaking journey to the edge of existence itself. When a mysterious energy signature is detected far beyond mapped space, a lone astronaut is dispatched on a mission that will push the limits of human endurance, perception, and belief.',
 '/assets/movies/beyond-horizon.png'),

('The Lost Expedition', 'Adventure', 'PG-13', '2h 6m', '2026-07-05',
 'Deep in uncharted jungle, an expedition team discovers a temple no human has entered in a thousand years. As ancient mechanisms awaken and the line between explorer and intruder blurs, they must decide which of them is worth the secrets they have come to find.',
 '/assets/movies/lost-expedition.png'),

('Midnight Promises', 'Romance', 'PG-13', '1h 52m', '2026-06-14',
 'Two strangers meet on the last train of the night and promise to find each other again exactly one year later. A tender, sweeping romance about distance, timing, and the small choices that decide everything.',
 '/assets/movies/midnight-promises.png'),

('The Spark', 'Animation', 'PG', '1h 38m', '2026-06-28',
 'When the last firefly in the valley refuses to light, a young girl sets off across glowing fields and impossible forests to convince it the world is still worth shining for. A luminous animated adventure for the whole family.',
 '/assets/movies/the-spark.png'),

('Shadows of Crestwood', 'Horror', 'R', '1h 57m', '2026-10-11',
 'The town of Crestwood has a tradition no one talks about. When a journalist returns to write the story her sister could not finish, she finds the answers waiting for her in the woods behind the old chapel. Some doors should stay closed.',
 '/assets/movies/shadows-crestwood.png'),

('Uncharted: Legacy of Kings', 'Action', 'PG-13', '2h 10m', '2026-07-18',
 'A reluctant treasure hunter is pulled back into the world he left behind when the map his father died protecting finally surfaces. From neon-lit Bangkok to crumbling temples in the Andes, the chase for the lost crown of three kingdoms begins.',
 '/assets/movies/uncharted-legacy.png');