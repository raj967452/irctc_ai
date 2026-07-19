import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/app/globals.css';
import { QueryProvider } from '@/lib/query/query-provider';

export default function App({ Component, pageProps }: AppProps) {
  return <QueryProvider><Head><link rel="manifest" href="/manifest.webmanifest"/><meta name="theme-color" content="#0b4fb3"/></Head><Component {...pageProps} /><script defer src="/register-sw.js" /></QueryProvider>;
}
