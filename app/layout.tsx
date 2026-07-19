import './globals.css';
import type { Metadata } from 'next';
import { QueryProvider } from '@/lib/query/query-provider';

export const metadata: Metadata = { title: 'IRCTC AI', description: 'Next.js 14 AI-enabled high-performance IRCTC platform.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><QueryProvider>{children}</QueryProvider><script defer src="/register-sw.js" /></body></html>;
}
