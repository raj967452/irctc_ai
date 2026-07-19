import dynamic from 'next/dynamic';
import { DynamicBookingShell } from '@/components/performance/DynamicBookingShell';
import { PageShell } from '@/components/PageShell';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const BookingExperience = dynamic(() => import('@/components/booking/BookingExperience').then(mod => mod.BookingExperience), { loading: () => <SkeletonLoader />, ssr: false });
export default function Booking() { return <PageShell title="Passenger Details" description="Auto-fill saved passengers, OCR ID scanning, CAPTCHA-less behavioral verification, fare calculation, catering, insurance, and countdown expiry."><DynamicBookingShell /><div className="mt-6"><BookingExperience /></div></PageShell>; }
export const getServerSideProps = async () => ({ props: {} });
