import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SearchParams = { from: string; to: string; date: string; travelClass: string };
export type Train = { id: string; name: string; from: string; to: string; fare: number; confirmationProbability: number };
export type Passenger = { name: string; age: number; idType?: string; berthPreference?: string };

interface BookingState {
  searchParams: SearchParams;
  selectedTrain: Train | null;
  passengers: Passenger[];
  paymentMethod: string | null;
  bookingId: string | null;
  setSearchParams: (params: SearchParams) => void;
  selectTrain: (train: Train) => void;
  addPassenger: (passenger: Passenger) => void;
  setPaymentMethod: (paymentMethod: string) => void;
  setBookingId: (bookingId: string) => void;
  clearBooking: () => void;
}

const initialSearchParams: SearchParams = { from: '', to: '', date: '', travelClass: '3A' };

export const useBookingStore = create<BookingState>()(
  persist(
    set => ({
      searchParams: initialSearchParams,
      selectedTrain: null,
      passengers: [],
      paymentMethod: null,
      bookingId: null,
      setSearchParams: params => set({ searchParams: params }),
      selectTrain: train => set({ selectedTrain: train }),
      addPassenger: passenger => set(state => ({ passengers: [...state.passengers, passenger] })),
      setPaymentMethod: paymentMethod => set({ paymentMethod }),
      setBookingId: bookingId => set({ bookingId }),
      clearBooking: () => set({ searchParams: initialSearchParams, selectedTrain: null, passengers: [], paymentMethod: null, bookingId: null })
    }),
    { name: 'booking-storage' }
  )
);
