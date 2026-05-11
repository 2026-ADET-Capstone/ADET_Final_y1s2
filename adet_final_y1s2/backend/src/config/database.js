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

// Initialize database and create table
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected');

    // Create movies table if it doesn't exist
    const createTableQuery = `
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
    `;

    await connection.execute(createTableQuery);
    console.log('✓ Movies table ready');
    
    connection.release();
  } catch (error) {
    console.error('✗ Database error:', error.message);
    process.exit(1);
  }
}

initializeDatabase();

module.exports = pool;