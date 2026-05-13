'use client';

import { useEffect, useState } from 'react';
import { Movie, movieAPI } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import AboutSection from '@/components/AboutSection';
import StaffSection from '@/components/StaffSection';
import ConcessionsSection from '@/components/ConcessionsSection';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieAPI.getAllMovies();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <>
      {/* SHOWINGS */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <h2 className="text-2xl md:text-3xl font-light text-[#1a2a4a] tracking-[0.3em] text-center mb-12">
          Showings
        </h2>

        {loading ? (
          <p className="text-center text-slate-500 py-12">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            No movies yet. Go to{' '}
            <a href="/admin" className="text-[#1a2a4a] font-medium hover:underline">
              Admin
            </a>{' '}
            to add some!
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      
      <AboutSection />

     
      <StaffSection />

      
      <ConcessionsSection />
    </>
  );
}