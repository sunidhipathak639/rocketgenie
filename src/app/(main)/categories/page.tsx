import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { Sparkles, Grid } from 'lucide-react';

export default async function CategoriesPage() {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  });

  return (
    <div className="relative min-h-screen bg-slate-950 pb-32">
       {/* Fixed Ambient Background */}
       <div className="fixed inset-0 z-0">
          <img 
            src="/images/categories/directory_bg.png" 
            alt="" 
            className="w-full h-full object-cover opacity-10 blur-[100px]"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
       </div>

       {/* Premium Hero Section */}
       <div className="relative min-h-[45vh] md:min-h-[65vh] pt-24 md:pt-48 pb-16 md:pb-20 flex items-center overflow-hidden mb-12 md:mb-20">
         {/* Full Background Image */}
         <div className="absolute inset-0 z-0">
           <img 
             src="/images/categories/directory_bg.png" 
             alt="Categories"
             className="w-full h-full object-cover opacity-80 md:opacity-80"
           />
           {/* Dark Overlay Vignette */}
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
         </div>

         {/* Decorative background element */}
         <div className="absolute top-0 right-0 text-[8rem] md:text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none -translate-y-1/2 translate-x-1/4 italic uppercase z-0">
           GENIE
         </div>

         <div className="max-w-[1600px] px-6 md:px-10 lg:px-16 relative z-10">
           <div className="flex flex-col items-start space-y-6 md:space-y-8 max-w-5xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 backdrop-blur-2xl text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/20 shadow-2xl">
                 <Grid className="w-3.5 h-3.5" />
                 <span>Service Directory</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                   EXPLORE <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic text-3xl sm:text-5xl md:text-8xl lg:text-9xl">CATEGORIES</span>
                </h1>
              </div>
              <p className="text-base md:text-2xl text-white/70 font-medium max-w-2xl leading-relaxed italic border-l-4 border-blue-500/50 pl-5 md:pl-8">
                 Browse through our meticulously curated categories to find the perfect verified professional for your needs.
              </p>
           </div>
         </div>
       </div>

       <div className="max-w-[1600px] px-6 md:px-10 lg:px-16 relative z-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {categories.docs.map((cat, i) => (
             <CategoryCard key={cat.id} category={cat} index={i} />
           ))}
         </div>
       </div>
    </div>
  );
}
