const mysql = require('mysql2/promise');
require('dotenv/lib/main').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'moonlight_motion',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected');
    connection.release();
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    process.exit(1);
  }
}

initializeDatabase();

module.exports = pool;