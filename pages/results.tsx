import dynamic from 'next/dynamic';
import { PageShell } from '@/components/PageShell';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const ResultsExperience = dynamic(() => import('@/components/results/ResultsExperience').then(mod => mod.ResultsExperience), { loading: () => <SkeletonLoader />, ssr: false });
export default function Results() { return <PageShell title="Search Results" description="Virtualized 1000+ train list, WebSocket seat availability, Web Worker filters, AI probability badges, price prediction, skeleton loading, and infinite scroll."><ResultsExperience /></PageShell>; }
export const getServerSideProps = async () => ({ props: {} });
