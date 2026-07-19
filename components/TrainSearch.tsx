'use client';
import { useMemo } from 'react';
import { useJourneyStore } from '@/lib/store/journey-store';

const trains = [
  ['12951', 'Mumbai Rajdhani', 'New Delhi', 'Mumbai Central', '16:35', '08:35', '96%'],
  ['12002', 'Shatabdi Express', 'New Delhi', 'Bhopal', '06:00', '14:25', '91%'],
  ['12295', 'Sanghamitra SF', 'Bengaluru', 'Danapur', '09:15', '07:40', '88%'],
  ['12627', 'Karnataka Exp', 'Bengaluru', 'New Delhi', '19:20', '10:30', '93%'],
  ['22439', 'Vande Bharat', 'New Delhi', 'Katra', '06:00', '14:00', '98%']
];

export function TrainSearch() {
  const { query, setQuery } = useJourneyStore();
  const filtered = useMemo(() => trains.filter(train => train.join(' ').toLowerCase().includes(query.toLowerCase())), [query]);
  return <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-black">Instant train search</h2><input aria-label="Search trains" className="mt-4 w-full rounded-2xl border border-blue-100 p-4" placeholder="Search train, city, number..." value={query} onChange={event => setQuery(event.target.value)} /><div className="mt-4 grid gap-3 md:grid-cols-2">{filtered.map(train => <article key={train[0]} className="rounded-2xl border border-blue-100 bg-white/80 p-4"><strong>{train[1]}</strong><span className="float-right font-black text-rail">{train[0]}</span><p>{train[2]} → {train[3]}</p><small>{train[4]} - {train[5]} · on-time {train[6]}</small></article>)}</div></section>;
}
