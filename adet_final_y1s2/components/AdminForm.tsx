'use client';

import { useState } from 'react';
import { Movie, movieAPI } from '@/lib/api';
import Button from './Button';
import Input from './Input';

interface AdminFormProps {
  movie?: Movie;
  onSuccess?: () => void;
}

export default function AdminForm({ movie, onSuccess }: AdminFormProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    genre: movie?.genre || '',
    rating: movie?.rating || '',
    runtime: movie?.runtime || '',
    releaseDate: movie?.releaseDate || '',
    description: movie?.description || '',
    image: movie?.image || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (movie) {
        await movieAPI.updateMovie(movie.id, formData);
      } else {
        await movieAPI.createMovie(formData);
      }
      setFormData({
        title: '',
        genre: '',
        rating: '',
        runtime: '',
        releaseDate: '',
        description: '',
        image: '',
      });
      onSuccess?.();
    } catch (err) {
      setError('Failed to save movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">
        {movie ? 'Edit Movie' : 'Add New Movie'}
      </h2>

      {error && <div className="bg-red-900 text-red-100 p-3 rounded mb-4">{error}</div>}

      <div className="space-y-4">
        <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
        <Input label="Genre" name="genre" value={formData.genre} onChange={handleChange} required />
        <Input label="Rating" name="rating" value={formData.rating} onChange={handleChange} placeholder="e.g., 8.5" required />
        <Input label="Runtime (minutes)" name="runtime" value={formData.runtime} onChange={handleChange} required />
        <Input label="Release Date" name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} required />
        <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} />
        
        <div>
          <label className="block text-sm font-semibold text-amber-400 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            required
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button type="submit" isLoading={loading}>
          {movie ? 'Update Movie' : 'Add Movie'}
        </Button>
      </div>
    </form>
  );
}