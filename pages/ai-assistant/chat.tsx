import dynamic from 'next/dynamic';
import { PageShell } from '@/components/PageShell';
import { SkeletonLoader } from '@/components/SkeletonLoader';
const AIAssistantExperience = dynamic(() => import('@/components/assistant/AIAssistantExperience').then(mod => mod.AIAssistantExperience), { loading: () => <SkeletonLoader />, ssr: false });
export default function Chat() { return <PageShell title="AI Chat Interface" description="Conversational interface for natural language search, voice input, contextual recommendations, booking assistance, complaints, and 12 Indian languages."><AIAssistantExperience /></PageShell>; }
export const getStaticProps = async () => ({ props: {}, revalidate: 60 });
