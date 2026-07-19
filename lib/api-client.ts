import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 300_000,
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

export async function apiPost<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<TResponse>;
}

export async function mutateBooking<TBooking extends { bookingId?: string }>(data: TBooking) {
  await queryClient.cancelQueries({ queryKey: ['booking'] });
  queryClient.setQueryData(['booking'], data);
  try {
    return await apiPost<TBooking, { ok: boolean }>('/api/booking', data);
  } catch (error) {
    queryClient.invalidateQueries({ queryKey: ['booking'] });
    throw error;
  }
}
