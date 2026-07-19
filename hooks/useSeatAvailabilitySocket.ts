import { useEffect, useState } from 'react';
export function useSeatAvailabilitySocket(trainId: string) { const [available, setAvailable] = useState(24); useEffect(() => { const timer = setInterval(() => setAvailable(value => Math.max(0, value + (Math.random() > 0.5 ? 1 : -1))), 2500); return () => clearInterval(timer); }, [trainId]); return available; }
