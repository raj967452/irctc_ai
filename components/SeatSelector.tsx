export default function SeatSelector() {
  const seats = ['L1', 'L2', 'M1', 'M2', 'U1', 'U2'];
  return <section className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">AI-assisted seat preference</h2><div className="mt-3 grid grid-cols-3 gap-2">{seats.map(seat => <button className="rounded-xl border border-blue-100 p-3 font-bold hover:bg-blue-50" key={seat}>{seat}</button>)}</div></section>;
}
