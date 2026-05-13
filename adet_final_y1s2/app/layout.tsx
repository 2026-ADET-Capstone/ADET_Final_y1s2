import type { Metadata } from 'next';
import './globals.css';
import LayoutClient from './LayoutClient';

export const metadata: Metadata = {
  title: 'Moonlight Motion',
  description: 'Drive-in movies, reimagined.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}