'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';
import Logo from '@/components/Logo';

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
      <div className="hidden lg:block lg:w-2/3 relative overflow-hidden bg-black">
        <img
          src="/assets/MM_Login_sidepicture.png"
          alt="Moonlight Drive-In Theatre"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* RIGHT — Login card */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center px-8 py-12 relative bg-white">
        <div className="absolute top-6 right-6">
  <Logo size={48} href="/" />
        </div>

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