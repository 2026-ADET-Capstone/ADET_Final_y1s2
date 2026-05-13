'use client';

import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  size?: number;
  href?: string | null;
  className?: string;
}

export default function Logo({ size = 78, href = '/', className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false);

  const fallback = (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: '#1a2a4a',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: size * 0.28,
          fontWeight: 300,
          letterSpacing: '0.15em',
        }}
      >
        MM
      </span>
    </div>
  );

  const content = failed ? fallback : (
    <img
      src="/assets/MM_logo.png"
      alt="Moonlight Motion"
      width={size}
      height={size}
      style={{ borderRadius: '9999px', objectFit: 'cover' }}
      className={className}
      onError={() => setFailed(true)}
    />
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Moonlight Motion home" style={{ display: 'inline-block' }}>
      {content}
    </Link>
  );
}