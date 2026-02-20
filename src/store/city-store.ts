'use client';

import { create } from 'zustand';

interface CityState {
  selectedCity: string | null;
  setSelectedCity: (cityId: string | null) => void;
}

export const useCityStore = create<CityState>((set) => ({
  selectedCity: null,
  setSelectedCity: (cityId) => set({ selectedCity: cityId }),
}));
