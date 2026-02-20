import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CATEGORY_STYLE_MAP } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayload({ config: configPromise });
  const { slug } = await params;

  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (categories.docs.length === 0) notFound();
  const category = categories.docs[0];
  
  const style = CATEGORY_STYLE_MAP[category.name] || {
    image: '/images/categories/tech.png',
    color: 'from-slate-600 to-slate-800'
  };

  const businesses = await payload.find({
    collection: 'businesses',
    where: { category: { equals: category.id }, status: { equals: 'active' } },
  });

  return (
    <div className="relative min-h-screen bg-slate-950 pb-32">
      {/* Immersive Background Image (Fixed) */}
      <div className="fixed inset-0 z-0">
        <img 
          src={style.image} 
          alt="" 
          className="w-full h-full object-cover opacity-10 blur-[100px]"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      {/* Premium Hero Section */}
      <div className="relative min-h-[60vh] md:min-h-[80vh] pt-32 md:pt-48 pb-20 flex items-center overflow-hidden mb-12 md:mb-20">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={style.image} 
            alt={category.name}
            className="w-full h-full object-cover opacity-80 md:opacity-90"
          />
          {/* Dynamic Gradient Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r transition-all duration-700 opacity-30 md:opacity-40",
            style.color
          )} />
          
          {/* Subtle vignette for left-alignment readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Bottom Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 text-[10rem] md:text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none -translate-y-1/2 translate-x-1/4 italic uppercase z-0">
          GENIE
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-start space-y-6 md:space-y-10 max-w-4xl">
             
             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 backdrop-blur-2xl text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premium Network</span>
                <Sparkles className="w-3.5 h-3.5" />
             </div>
             
             <div className="space-y-4">
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {category.name.toUpperCase()} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic">EXPERTS</span>
               </h1>
             </div>
             
             <p className="text-sm sm:text-base md:text-lg text-white/70 font-medium max-w-2xl leading-relaxed italic border-l-4 border-blue-500/50 pl-5 md:pl-8">
                {category.description || `Discover the most trusted and verified ${category.name} in your city. Premium quality guaranteed through the Rocket Genie vetting process.`}
             </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {businesses.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.docs.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[60px] shadow-2xl shadow-slate-200/50 space-y-6">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <Sparkles className="w-8 h-8" />
             </div>
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">No experts found yet</h3>
                <p className="text-slate-500 font-medium italic">We're currently vetting new professionals for this category. Stay tuned.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
