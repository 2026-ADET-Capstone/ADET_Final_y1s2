const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'moonlight_motion',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize database and create tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected');

    // Movies table
    await connection.execute(`
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
      )
    `);
    console.log('✓ Movies table ready');

    // Staff table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image VARCHAR(500),
        displayOrder INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Staff table ready');

    // Concessions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS concessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6,2) NOT NULL,
        displayOrder INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Concessions table ready');

    connection.release();
  } catch (error) {
    console.error('✗ Database error:', error.message);
    process.exit(1);
  }
}

initializeDatabase();

module.exports = pool;