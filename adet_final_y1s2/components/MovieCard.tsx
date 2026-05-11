'use client';

import Link from 'next/link';
import { Movie } from '@/lib/api';

interface MovieCardProps {
  movie: Movie;
  onDelete?: (id: number) => void;
}

export default function MovieCard({ movie, onDelete }: MovieCardProps) {
  return (
    <div className="group cursor-pointer h-full">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-blue-900 transition-all duration-300 h-80 bg-gray-100">
          {movie.image ? (
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-4xl">🎬</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{movie.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{movie.genre}</p>
            <div className="flex gap-2 text-xs text-gray-600">
              <span>⭐ {movie.rating}</span>
              <span>⏱️ {movie.runtime} min</span>
            </div>
          </div>
          <div className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded font-bold text-xs">
            {movie.genre}
          </div>
        </div>
      </Link>
    </div>
  );
}