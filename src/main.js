const routes = [
  { name: 'Book Ticket', sla: '< 900 ms', users: '10M ready' },
  { name: 'PNR Status', sla: '< 350 ms', users: 'edge cached' },
  { name: 'Live Train', sla: '< 500 ms', users: 'streaming' },
  { name: 'Meals', sla: '< 700 ms', users: 'async' },
  { name: 'Refunds', sla: '< 600 ms', users: 'resilient' },
];

const trains = [
  ['12951', 'Mumbai Rajdhani', 'New Delhi', 'Mumbai Central', '16:35', '08:35', '96%'],
  ['12002', 'Shatabdi Express', 'New Delhi', 'Bhopal', '06:00', '14:25', '91%'],
  ['12295', 'Sanghamitra SF', 'Bengaluru', 'Danapur', '09:15', '07:40', '88%'],
  ['12627', 'Karnataka Exp', 'Bengaluru', 'New Delhi', '19:20', '10:30', '93%'],
  ['22439', 'Vande Bharat', 'New Delhi', 'Katra', '06:00', '14:00', '98%'],
];

const layers = ['Global DNS + WAF', 'L7 Load Balancer', 'Edge SSR workers', 'API gateway', 'Booking services', 'Inventory shards', 'Event streaming', 'AI feature store'];

const root = document.getElementById('root');
root.innerHTML = `
  <main>
    <section class="hero">
      <nav aria-label="Primary navigation"><strong>🚆 IRCTC AI</strong><a>Plan</a><a>Status</a><a>Meals</a><a>Support</a></nav>
      <div class="hero-grid">
        <div><p class="eyebrow">Ultra-fast rail commerce platform</p><h1>Fastest-feeling IRCTC UI for every page, built for massive demand.</h1><p class="lede">Predictive search, edge-rendered journeys, optimistic booking, and AI assistance keep critical flows responsive under flash-sale traffic.</p><button>Start booking</button><button class="ghost">View architecture</button></div>
        <div class="booking-card" aria-label="AI booking card"><div class="icon">🤖</div><h2>AI Booking Copilot</h2><p>Finds routes, predicts waitlist movement, pre-fills passenger profiles, and recommends alternate trains when inventory changes.</p><div class="prompt">“Book the fastest AC train from Delhi to Mumbai tomorrow morning.”</div></div>
      </div>
    </section>
    <section class="metrics" aria-label="Performance targets">
      ${metric('⚡','Core Web Vitals','< 1.8s LCP','SSR, streaming, image budgets')}${metric('📈','API p95','< 250ms','read replicas + cache aside')}${metric('🧭','Scale target','10M users','autoscaling + queues')}${metric('🛡️','Reliability','99.99%','multi-zone failover')}
    </section>
    <section class="workspace"><div class="panel"><h2>Instant train search</h2><input id="search" aria-label="Search trains" placeholder="Search train, city, number..."/><div id="train-list" class="train-list"></div></div><div class="panel"><h2>All-page performance model</h2>${routes.map(r => `<div class="route"><b>${r.name}</b><span>${r.sla}</span><em>${r.users}</em></div>`).join('')}</div></section>
    <section class="panel architecture"><h2>Backend blueprint with load balancer</h2><div>${layers.map((layer, i) => `<span>${i + 1}. ${layer}</span>`).join('')}</div><p>Traffic is split by geography and page intent, with hot timetable data served from edge caches while booking writes use idempotent commands, distributed locks, and queue-based payment confirmation.</p></section>
  </main>`;

function metric(icon, label, value, detail) { return `<article class="metric"><i>${icon}</i><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>`; }
function renderTrains(query = '') { document.getElementById('train-list').innerHTML = trains.filter(t => t.join(' ').toLowerCase().includes(query.toLowerCase())).map(t => `<article><strong>${t[1]}</strong><span>${t[0]}</span><p>${t[2]} → ${t[3]}</p><small>${t[4]} - ${t[5]} · on-time ${t[6]}</small></article>`).join(''); }
document.getElementById('search').addEventListener('input', event => requestAnimationFrame(() => renderTrains(event.target.value)));
renderTrains();
