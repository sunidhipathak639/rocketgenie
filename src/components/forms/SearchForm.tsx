'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { useCityStore } from '@/store/city-store';
import { cn } from '@/lib/utils';

export const SearchForm = ({ initialQuery = '' }: { initialQuery?: string }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const { selectedCity } = useCityStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const params = new URLSearchParams();
    params.set('q', query);
    if (selectedCity) params.set('city', selectedCity);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "relative flex w-full items-center transition-all duration-500",
        isFocused ? "scale-[1.02]" : "scale-100"
      )}
    >
      <div className="absolute left-3.5 z-10 text-slate-400">
        <Sparkles className={cn("w-4 h-4 transition-colors", isFocused ? "text-blue-500" : "text-slate-400")} />
      </div>
      <Input
        type="text"
        placeholder="Search experts..."
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-12 md:pr-24 h-11 bg-white text-slate-900 rounded-full border border-slate-100 shadow-xl shadow-black/5 focus-visible:ring-2 focus-visible:ring-blue-500/10 font-medium text-sm placeholder:text-slate-500"
      />
      <Button 
        type="submit" 
        className="absolute right-1.5 top-1.5 bottom-1.5 w-8 md:w-auto md:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
      >
        <Search className="w-3.5 h-3.5 md:mr-1.5" />
        <span className="hidden md:inline">Search</span>
      </Button>
    </form>
  );
};
