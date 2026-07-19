import { backendServices } from '@/lib/backend/services';

const gateway = 'Kong / AWS API Gateway / Envoy';

export function ArchitecturePanel() {
  return <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-black">Backend microservices for 10M users</h2><p className="mt-2 text-slate-700">{gateway} performs JWT validation, quota checks, L7 routing, and circuit breaking before requests fan out to independent service clusters.</p><div className="mt-4 grid gap-3 md:grid-cols-3">{backendServices.map(service => <article key={service.name} className="rounded-2xl bg-[#06255a] p-4 text-white"><strong>{service.name}</strong><p className="text-sm text-blue-100">{service.storage.join(' · ')}</p><small>{service.scaleStrategy}</small></article>)}</div></section>;
}
