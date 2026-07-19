import { DynamicBookingShell } from '@/components/performance/DynamicBookingShell';
import { PageShell } from '@/components/PageShell';
export default function Booking() { return <PageShell title="Passenger Details" description="Route-level dynamic imports keep the booking form fast while component-level splitting defers the seat selector."><DynamicBookingShell /></PageShell>; }
export const getServerSideProps = async () => ({ props: {} });
