'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = await login(email, password);
      router.push(auth?.isAdmin ? '/admin' : '/');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT — Drive-in hero */}
      <div className="hidden lg:flex lg:w-2/3 relative items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b1530] via-[#1a2a4a] to-[#0b1530]">
        {/* Starfield effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
        </div>

        {/* Replace this block with <img src="/login-hero.jpg" ... /> if you have a photo */}
        <div className="relative z-10 text-center px-12">
          <div className="w-36 h-36 mx-auto mb-10 rounded-full bg-white/5 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <span className="text-white text-5xl font-light tracking-[0.2em]">MM</span>
          </div>
          <h1 className="text-white text-6xl font-light tracking-[0.35em] mb-3">
            MOONLIGHT
          </h1>
          <p className="text-white/70 text-lg tracking-[0.45em]">
            DRIVE-IN THEATRE
          </p>
        </div>
      </div>

      {/* RIGHT — Login card */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center px-8 py-12 relative bg-white">
        <Link
          href="/"
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#1a2a4a] flex items-center justify-center hover:bg-[#243660] transition"
          aria-label="Back to home"
        >
          <span className="text-white text-xs font-light tracking-widest">MM</span>
        </Link>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-light text-[#1a2a4a] mb-10 text-center tracking-wide">
            Please Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-slate-600 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2a4a] focus:border-transparent text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-slate-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2a4a] focus:border-transparent text-slate-900"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2a4a] text-white py-2.5 rounded-md hover:bg-[#243660] transition disabled:opacity-50 font-medium tracking-wide"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-8">
            <Link href="/" className="hover:text-[#1a2a4a]">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}