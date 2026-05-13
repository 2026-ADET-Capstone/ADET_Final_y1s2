'use client';

import { useEffect, useState } from 'react';
import { StaffMember, staffAPI } from '@/lib/api';

export default function StaffSection() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    staffAPI.getAll().then((data) => {
      setStaff(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-[#1a2a4a] tracking-[0.25em] text-center mb-12">
          Our Staff
        </h2>

        {loading ? (
          <p className="text-center text-slate-500 py-8">Loading staff...</p>
        ) : staff.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No staff members yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {staff.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelected(member)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                aria-label={`View ${member.name}'s bio`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white text-sm font-medium">{member.name}</p>
                  <p className="text-white/80 text-xs">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square bg-slate-200">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[#1a2a4a]">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.role}</p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.bio}</p>
              <button
                onClick={() => setSelected(null)}
                className="w-full mt-4 bg-[#1a2a4a] text-white py-2.5 rounded-md hover:bg-[#243660] transition font-medium tracking-wide"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}