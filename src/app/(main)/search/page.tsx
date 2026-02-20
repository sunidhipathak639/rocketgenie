'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, MapPin, Sparkles } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const city = searchParams.get('city') || '';
  
  const { data: results, isLoading } = useSearch(query, city);

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[450px] w-full rounded-[32px]" />
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-32 space-y-6">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
          <Search className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">No results found for &quot;{query}&quot;</h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto italic">We couldn't find any businesses matching your search. Try adjusting your keywords or selecting a different city.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {results.map((business: any, i: number) => (
        <BusinessCard key={business.id} business={business} index={i} />
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32">
      {/* Premium Search Header */}
      <div className="relative h-[45vh] md:h-[55vh] flex items-center overflow-hidden mb-12 md:mb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/search/search_bg.png" 
            alt="Search background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-[1600px] w-full px-6 md:px-10 lg:px-16 relative z-10 pt-20">
          <div className="max-w-3xl space-y-6">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search Results</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
                FIND YOUR <br />
                <span className="text-blue-500">MATCH</span>
             </h1>
             <p className="text-xl text-white/50 font-medium max-w-xl leading-relaxed">
               Discovering excellence from our curated network of 
               verified professionals and premium service providers.
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] px-6 md:px-10 lg:px-16 relative z-10">
        <Suspense fallback={<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-[450px] w-full rounded-[32px]" />)}
        </div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
