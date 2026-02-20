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
      {/* Search Header */}
      <div className="bg-white border-b border-slate-100 pt-40 pb-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search Results</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                FIND YOUR <br />
                <span className="text-blue-600">MATCH</span>
             </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-[450px] w-full rounded-[32px]" />)}
        </div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
