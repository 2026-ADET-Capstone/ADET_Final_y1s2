import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
        <Logo size={44} />
        <div className="text-center text-xs text-slate-500 leading-relaxed">
          <p>App Development &amp; Emerging Technologies</p>
          <p>First Year Final &mdash; Harlan Tasci</p>
        </div>
        <Link
          href="/login"
          className="text-xs text-[#1a2a4a] font-medium hover:underline"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
}