const Movie = require('../models/Movie');

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.getAll();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  }

  static async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.getById(id);

      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movie' });
    }
  }

  static async createMovie(req, res) {
    try {
      const { title, genre, rating, runtime, releaseDate, description, image } = req.body;

      if (!title || !genre || !rating || !runtime || !releaseDate || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const movie = await Movie.create({
        title,
        genre,
        rating,
        runtime,
        releaseDate,
        description,
        image,
      });

      res.status(201).json(movie);
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  }

  static async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const { title, genre, rating, runtime, releaseDate, description, image } = req.body;

      const exists = await Movie.getById(id);
      if (!exists) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      const movie = await Movie.update(id, {
        title,
        genre,
        rating,
        runtime,
        releaseDate,
        description,
        image,
      });

      res.json(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: 'Failed to update movie' });
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;

      const exists = await Movie.getById(id);
      if (!exists) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      await Movie.delete(id);
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Failed to delete movie' });
    }
  }
}

module.exports = MovieController;