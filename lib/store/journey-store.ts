import { create } from 'zustand';
type JourneyState = { query: string; setQuery: (query: string) => void };
export const useJourneyStore = create<JourneyState>(set => ({ query: '', setQuery: query => set({ query }) }));
