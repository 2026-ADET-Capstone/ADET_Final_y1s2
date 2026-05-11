'use client';

import { useState } from 'react';
import AdminForm from '@/components/AdminForm';
import Button from '@/components/Button';

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-amber-400 mb-8">Admin Dashboard</h1>

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