import Link from 'next/link';

export function PageShell({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <main className="min-h-screen bg-[#eef5ff] px-6 py-8 text-slate-900"><nav className="mx-auto mb-8 flex max-w-6xl gap-4 text-sm font-bold text-blue-800"><Link href="/">Home</Link><Link href="/search">Search</Link><Link href="/pnr-status">PNR</Link><Link href="/ai-assistant/chat">AI Assistant</Link></nav><section className="mx-auto max-w-6xl rounded-3xl bg-white/90 p-8 shadow-xl"><h1 className="text-4xl font-black">{title}</h1><p className="mt-3 max-w-3xl text-lg text-slate-700">{description}</p><div className="mt-6">{children}</div></section></main>;
}
