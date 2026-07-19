import { PageShell } from '@/components/PageShell';
export default function Page() { return <PageShell title="Live Train Status" description="Streaming live train updates optimized for high fanout."><div className="rounded-2xl bg-blue-50 p-5 font-bold text-blue-900">Performance target: 50-100ms global edge response, ISR for semi-static data, and offline-safe PWA reads.</div></PageShell>; }
export const getStaticProps = async () => ({ props: {}, revalidate: 60 });
