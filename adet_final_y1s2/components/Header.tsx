'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <div className="text-3xl font-bold">🎬</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-widest">
                MOONLIGHT
              </h1>
              <p className="text-gray-600 text-sm font-semibold -mt-1">MOTION</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-8 items-center">
            <Link
              href="/"
              className={`text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>

            <Link
              href="/movies"
              className={`text-sm font-semibold transition-all duration-200 ${
                isActive('/movies')
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Movies
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-all duration-200 ${
                isActive('/about')
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>

            <Link
              href="/admin"
              className={`text-sm font-semibold px-4 py-2 rounded transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-blue-900 hover:text-white'
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}