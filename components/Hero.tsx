'use client';
import * as Dialog from '@radix-ui/react-dialog';

export function Hero() {
  return <section className="bg-gradient-to-br from-[#07285f] via-rail to-signal text-white px-6 py-8 md:px-16 md:py-14">
    <nav className="mx-auto flex max-w-7xl items-center gap-6"><strong className="mr-auto text-xl">🚆 IRCTC AI</strong><a>Plan</a><a>Status</a><a>Meals</a><a>Support</a></nav>
    <div className="mx-auto mt-14 grid max-w-7xl gap-8 md:grid-cols-[1.5fr_.9fr] md:items-center">
      <div><p className="text-sm font-black uppercase tracking-[.25em] text-cyan-100">Next.js 14 + Turbopack</p><h1 className="m-0 max-w-4xl text-5xl font-black leading-none md:text-7xl">Fastest-feeling IRCTC UI for every journey page.</h1><p className="max-w-3xl text-xl text-blue-50">React Server Components, SSR, streaming, PWA caching, and AI-assisted booking keep critical flows responsive under 10 million-user flash traffic.</p><Dialog.Root><Dialog.Trigger className="rounded-full bg-white px-5 py-3 font-black text-rail">Open AI Copilot</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 bg-black/50"/><Dialog.Content className="glass fixed left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl p-8 text-slate-900"><Dialog.Title className="text-2xl font-black">AI Booking Copilot</Dialog.Title><p>Natural-language booking, waitlist prediction, disruption-aware alternatives, passenger autofill, berth/meal preferences, and risk scoring before payment.</p><Dialog.Close className="rounded-full bg-rail px-4 py-2 font-bold text-white">Close</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root></div>
      <aside className="glass rounded-3xl p-6 text-slate-900"><h2 className="text-2xl font-black">Booking latency budget</h2><ul className="space-y-3"><li>Search shell: &lt; 1.8s LCP</li><li>Inventory API p95: &lt; 250ms</li><li>Payment command: idempotent + queued</li><li>Scale target: 10M users</li></ul></aside>
    </div>
  </section>;
}
