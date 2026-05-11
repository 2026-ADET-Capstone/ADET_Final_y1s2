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

  // Get movie by ID
  static async getById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM movies WHERE id = ?', [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  }

  // Create movie
  static async create(data) {
    try {
      const connection = await pool.getConnection();
      const { title, genre, rating, runtime, releaseDate, description, image } = data;

      const [result] = await connection.execute(
        'INSERT INTO movies (title, genre, rating, runtime, releaseDate, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, genre, rating, runtime, releaseDate, description, image || null]
      );

      connection.release();
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  // Update movie
  static async update(id, data) {
    try {
      const connection = await pool.getConnection();
      const { title, genre, rating, runtime, releaseDate, description, image } = data;

      await connection.execute(
        'UPDATE movies SET title = ?, genre = ?, rating = ?, runtime = ?, releaseDate = ?, description = ?, image = ? WHERE id = ?',
        [title, genre, rating, runtime, releaseDate, description, image || null, id]
      );

      connection.release();
      return { id, ...data };
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  // Delete movie
  static async delete(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute('DELETE FROM movies WHERE id = ?', [id]);
      connection.release();
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
}

module.exports = Movie;