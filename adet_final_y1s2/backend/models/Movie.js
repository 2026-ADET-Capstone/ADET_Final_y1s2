const pool = require('../config/database');

class Movie {
  // Get all movies
  static async getAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM movies ORDER BY id DESC');
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
}