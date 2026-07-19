'use client';
import dynamic from 'next/dynamic';
import { QuickSearchWidget } from './QuickSearchWidget';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const LoginRegisterModal = dynamic(() => import('./LoginRegisterModal'), { loading: () => <SkeletonLoader />, ssr: false });
const routes = ['Delhi → Mumbai Rajdhani', 'Bengaluru → Chennai Shatabdi', 'Howrah → Puri Vande Bharat'];
const statuses = ['12951 running on time', '12002 platform changed to 5', '22439 departed 2 min early'];
export function HomeExperience() { return <div className="grid gap-6"><QuickSearchWidget /><section className="grid gap-4 md:grid-cols-3">{routes.map(route => <article className="rounded-3xl bg-white p-5 shadow" key={route}><strong>{route}</strong><p>Popular routes carousel · CDN cached promo art</p></article>)}</section><div className="overflow-hidden rounded-2xl bg-slate-900 p-3 text-white"><span className="animate-pulse">Real-time train status ticker: {statuses.join(' • ')}</span></div><div className="rounded-3xl bg-gradient-to-r from-amber-200 to-cyan-200 p-6 font-black">Promotional banners are CDN cached with responsive images and lazy loading.</div><LoginRegisterModal /></div>; }
