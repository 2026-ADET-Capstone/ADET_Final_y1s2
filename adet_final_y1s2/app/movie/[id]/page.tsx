'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Movie, movieAPI } from '@/lib/api';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError('Invalid movie ID');
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const all = await movieAPI.getAllMovies();
        const found = all.find((m) => m.id === id) || null;
        if (!found) setError('Movie not found');
        else setMovie(found);
      } catch (err) {
        console.error(err);
        setError('Failed to load movie');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-slate-500">Loading movie...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-600 mb-6">{error || 'Movie not found'}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#1a2a4a] text-white px-6 py-2.5 rounded-md hover:bg-[#243660] transition"
        >
          Back to home
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-light text-[#1a2a4a] tracking-[0.3em] text-center mb-12">
        {movie.title}
      </h1>

      <div className="grid md:grid-cols-[260px_1fr] gap-10">
        <div className="bg-slate-200 rounded-lg overflow-hidden self-start shadow-md">
          {movie.image ? (
            <img src={movie.image} alt={movie.title} className="w-full h-auto object-cover" />
          ) : (
            <div className="aspect-[2/3] flex items-center justify-center text-slate-400 text-sm">
              No poster
            </div>
          )}

          <div className="p-4 space-y-1 text-sm text-slate-700">
            <p><span className="text-slate-500">Runtime:</span> {movie.runtime}</p>
            <p><span className="text-slate-500">Rating:</span> {movie.rating}</p>
            <p><span className="text-slate-500">Genre:</span> {movie.genre}</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {movie.description}
          </p>

          <button
            onClick={() => router.push('/')}
            className="bg-[#1a2a4a] text-white px-6 py-2.5 rounded-md hover:bg-[#243660] transition font-medium tracking-wide"
          >
            ← Back to showings
          </button>
        </div>
      </div>
    </main>
  );
}