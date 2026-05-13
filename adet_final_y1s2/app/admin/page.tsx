'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, logout } from '@/lib/auth';
import AdminForm from '@/components/AdminForm';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.isAdmin) {
      router.replace('/login');
    } else {
      setAdminEmail(auth.email);
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Verifying access...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-light text-[#1a2a4a] tracking-wide">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Signed in as {adminEmail}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition"
        >
          Log out
        </button>
      </div>

      {!showForm && (
        <Button onClick={() => setShowForm(true)} size="lg">
          Add New Movie
        </Button>
      )}

      {showForm && (
        <AdminForm onSuccess={() => setShowForm(false)} />
      )}
    </main>
  );
}