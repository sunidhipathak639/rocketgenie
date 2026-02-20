'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/lib/motion';

interface BusinessCardProps {
  business: any;
  className?: string;
  index?: number;
}

export const BusinessCard = ({ business, className, index = 0 }: BusinessCardProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
    >
      <Link href={`/business/${business.id}`}>
        <Card className={cn(
          "group relative overflow-hidden bg-white border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-700 rounded-[32px]",
          className
        )}>
          {/* Image Container */}
          <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              {business.images?.[0] ? (
                 <img 
                   src={typeof business.images[0] === 'string' ? business.images[0] : business.images[0].url} 
                   alt={business.name}
                   className="object-cover w-full h-full"
                 />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 italic font-black text-6xl text-slate-200 tracking-tighter">
                  GENIE
                </div>
              )}
            </MotionDiv>
            
            {/* Glass Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Top Badges */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
              <div className="flex flex-col gap-2">
                {business.featured && (
                  <div className="bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-2xl shadow-blue-500/40">
                    Premium
                  </div>
                )}
                {business.verified && (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.15em] flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-blue-400" /> Verified
                  </div>
                )}
              </div>
              <div className="flex gap-2 pointer-events-auto">
                {business.googleMapsUrl && (
                  <a 
                    href={business.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                )}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-red-500 transition-all"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price/Rating Tag */}
            <div className="absolute bottom-5 left-5 pointer-events-none">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-xl">
                 <span className="text-xs font-black text-slate-900">{business.rating || '5.0'}</span>
                 <div className="flex gap-0.5">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={cn("w-2.5 h-2.5", i < Math.floor(business.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-slate-200")} />
                   ))}
                 </div>
              </div>
            </div>
          </div>

          <CardHeader className="p-8 pt-7 flex flex-col items-start space-y-3">
             <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest leading-none">
                {business.category?.name || 'Local Service'}
             </div>
             <CardTitle className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
               {business.name}
             </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-6">
            <div className="flex items-start gap-3 group/loc">
              <div className="mt-1 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover/loc:bg-blue-50 group-hover/loc:border-blue-100 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover/loc:text-blue-500" />
              </div>
              {business.googleMapsUrl ? (
                <a 
                  href={business.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[13px] font-bold leading-relaxed text-slate-600 hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {business.address}, {business.city?.name}
                </a>
              ) : (
                <p className="text-[13px] font-medium leading-relaxed text-slate-500 italic line-clamp-2">
                  {business.address}, {business.city?.name}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <div className="flex items-center gap-4">
                 <div className="flex -space-x-3 pointer-events-none">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                       U{i}
                     </div>
                   ))}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs font-black text-slate-900 leading-none">{business.reviewCount || '24'} Reviews</span>
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Trust</span>
                 </div>
               </div>
               
               <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5" />
               </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </MotionDiv>
  );
};
