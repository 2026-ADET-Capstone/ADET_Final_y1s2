'use client';

import { useEffect, useState } from 'react';
import { Movie, movieAPI } from '@/lib/api';
import MovieCard from '@/components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await movieAPI.getAllMovies();
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-amber-400 mb-4">Welcome to Moonlight Motion</h1>
        <p className="text-xl text-gray-300">Your favorite drive-in movie experience</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-400">Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">No movies yet. Go to <a href="/admin" className="text-amber-400 hover:underline">Admin</a> to add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}