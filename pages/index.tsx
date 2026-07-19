import dynamic from 'next/dynamic';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const Landing = dynamic(() => import('@/app/page'), { loading: () => <SkeletonLoader />, ssr: true });
export default Landing;
export const getStaticProps = async () => ({ props: {}, revalidate: 60 });
