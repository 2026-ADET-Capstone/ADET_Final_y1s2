'use client';

import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  size?: number;
  href?: string | null;
  className?: string;
}

export default function Logo({ size = 48, href = '/', className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <div
      className={`rounded-full bg-[#1a2a4a] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-light tracking-widest"
        style={{ fontSize: size * 0.28 }}
      >
        MM
      </span>
    </div>
  ) : (
    <img
      src="/assets/MM_Logo.png"
      alt="Moonlight Motion"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Moonlight Motion home" className="inline-block">
      {content}
    </Link>
  );
}