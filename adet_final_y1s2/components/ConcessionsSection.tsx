'use client';

import { useEffect, useState, useMemo } from 'react';
import { ConcessionItem, concessionsAPI } from '@/lib/api';

const CATEGORY_ORDER = ['Popcorn', 'Snacks', 'Drinks', 'A La Carte'];

function formatPrice(price: number | string): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return `$${n.toFixed(2)}`;
}

export default function ConcessionsSection() {
  const [items, setItems] = useState<ConcessionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    concessionsAPI.getAll().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, ConcessionItem[]> = {};
    items.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [items]);

  const categories = useMemo(() => {
    const present = Object.keys(grouped);
    const ordered = CATEGORY_ORDER.filter((c) => present.includes(c));
    const extras = present.filter((c) => !CATEGORY_ORDER.includes(c));
    return [...ordered, ...extras];
  }, [grouped]);

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-[#1a2a4a] tracking-[0.25em] text-center mb-12">
          Concessions Information
        </h2>

        {loading ? (
          <p className="text-center text-slate-500 py-8">Loading menu...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/assets/MM_LoginPicureFull.png"
                alt="Moonlight Motion concessions"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {categories.map((cat) => (
                  <div key={cat}>
                    <h3 className="text-sm font-semibold text-[#1a2a4a] tracking-widest uppercase mb-3 border-b border-slate-200 pb-2">
                      {cat}
                    </h3>
                    <ul className="space-y-1.5 text-sm">
                      {grouped[cat].map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-baseline gap-2"
                        >
                          <span className="text-slate-700">{item.name}</span>
                          <span className="text-slate-400 flex-1 border-b border-dotted border-slate-300 mb-1" />
                          <span className="text-[#1a2a4a] font-medium tabular-nums">
                            {formatPrice(item.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}