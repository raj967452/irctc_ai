import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import { SkeletonLoader } from '@/components/SkeletonLoader';

const BookingPage = dynamic(() => import('@/components/performance/PassengerDetails'), {
  loading: () => <SkeletonLoader />,
  ssr: true
});
const SeatSelector = lazy(() => import('@/components/SeatSelector'));

export function DynamicBookingShell() {
  return <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]"><BookingPage /><Suspense fallback={<SkeletonLoader />}><SeatSelector /></Suspense></div>;
}
