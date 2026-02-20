'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCityStore } from '@/store/city-store';
import { MapPin } from 'lucide-react';

export const CitySelector = ({ onCityChange }: { onCityChange?: (cityId: string) => void }) => {
  const { selectedCity, setSelectedCity } = useCityStore();
  
  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data } = await axios.get('/api/cities');
      return data.docs;
    },
  });

  const handleChange = (id: string) => {
    const value = id === 'all' ? null : id;
    setSelectedCity(value);
    onCityChange?.(id);
  };

  return (
    <Select value={selectedCity || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="w-full h-14 bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-[20px] px-6 font-bold backdrop-blur-xl transition-all">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-400" />
          <SelectValue placeholder="All Cities" />
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto rounded-2xl border-slate-100 p-2 shadow-2xl bg-white/95 backdrop-blur-2xl scrollbar-none">
        <SelectItem value="all" className="rounded-xl font-bold">All Cities</SelectItem>
        {cities?.map((city: any) => (
          <SelectItem key={city.id} value={city.id} className="rounded-xl font-bold">
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
