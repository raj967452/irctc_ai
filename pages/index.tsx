import dynamic from 'next/dynamic';
import { PageShell } from '@/components/PageShell';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const HomeExperience = dynamic(() => import('@/components/home/HomeExperience').then(mod => mod.HomeExperience), { loading: () => <SkeletonLoader />, ssr: true });
export default function Home() { return <PageShell title="IRCTC AI Home" description="Quick search, AI suggestions, popular routes, real-time status, CDN banners, and lazy authentication."><HomeExperience /></PageShell>; }
export const getStaticProps = async () => ({ props: {}, revalidate: 60 });
