-- fish didnt like this bash script, so I had to change it to sql 

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image VARCHAR(500),
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create concessions table
CREATE TABLE IF NOT EXISTS concessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO staff (name, role, bio, image, displayOrder) VALUES
('Ethan Carter', 'Operations Manager',
 'Ethan keeps Moonlight Motion running smoothly from gate open to the final credits. He oversees nightly operations, coordinates staff, and ensures every guest has a seamless experience from arrival to exit.',
 '/assets/MM_Male_Employee1.png', 1),
('Maya Bennett', 'Guest Experience Lead',
 'Maya is the first friendly face guests see at the gate and the warm voice over the radio. She runs guest services with a focus on small touches that make every visit feel welcoming.',
 '/assets/MM_Female_Employee2.png', 2),
('Lila Park', 'Marketing & Events Coordinator',
 'Lila plans the special nights that make Moonlight Motion more than just a movie. From themed weekends to community showings, she designs the events and runs the social channels.',
 '/assets/MM_Female_Employee3.png', 3),
('Noah Reyes', 'Projection & Sound Tech',
 'Noah is the reason every frame looks crisp and every line of dialogue lands clean. He handles the projector, the FM transmitter, and all the tech that makes a drive-in actually work.',
 '/assets/MM_Male_Employee4.png', 4);

INSERT INTO concessions (category, name, price, displayOrder) VALUES
('Popcorn', 'Large', 7.00, 1),
('Popcorn', 'Medium', 5.50, 2),
('Popcorn', 'Small', 4.00, 3),
('Popcorn', 'Kids (Bowl)', 3.00, 4),
('Snacks', 'Nachos', 5.50, 1),
('Snacks', 'Pretzel', 4.50, 2),
('Snacks', 'Candy', 3.50, 3),
('Snacks', 'Pickles', 2.50, 4),
('Drinks', 'Large', 4.00, 1),
('Drinks', 'Medium', 3.00, 2),
('Drinks', 'Small', 2.50, 3),
('Drinks', 'Water', 2.00, 4),
('A La Carte', '#1 Popcorn + Drink', 9.50, 1),
('A La Carte', '#2 2 Drinks + Popcorn', 12.00, 2),
('A La Carte', '#3 Family Combo', 16.50, 3),
('A La Carte', '#4 Nachos + Drink', 8.50, 4);