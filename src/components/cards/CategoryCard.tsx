'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/lib/motion';
import { ArrowUpRight, Package } from 'lucide-react';
import { CATEGORY_STYLE_MAP } from '@/lib/constants';

interface CategoryCardProps {
  category: any;
  className?: string;
  index?: number;
}

export const CategoryCard = ({ category, className, index = 0 }: CategoryCardProps) => {
  const style = CATEGORY_STYLE_MAP[category.name] || { 
    icon: Package, 
    color: 'from-slate-600 to-slate-800', 
    image: '/images/categories/website_developer.png' 
  };
  
  const IconComponent = style.icon;
  const backgroundImage = style.image;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/categories/${category.slug}`}>
        <Card className={cn(
          "group relative overflow-hidden bg-slate-900 border-none transition-all duration-700 rounded-[32px] md:rounded-[40px] h-[280px] md:h-[340px] shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2",
          className
        )}>
          {/* Full Background Image */}
          <div className="absolute inset-0 transition-all duration-1000 group-hover:scale-110">
            <img 
              src={backgroundImage} 
              alt="" 
              className="w-full h-full object-cover opacity-80 md:opacity-90 group-hover:opacity-40 md:group-hover:opacity-30 transition-opacity duration-700"
            />
          </div>

          {/* Dynamic Gradient Overlay - lighter on mobile */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-20 md:opacity-20 group-hover:opacity-60 md:group-hover:opacity-70",
            style.color
          )} />
          
          {/* Glassmorphism Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

          <CardContent className="h-full p-6 md:p-10 flex flex-col items-start justify-between relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[24px] bg-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-2xl border border-white/20">
              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-slate-900 transition-colors duration-500" />
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-0.5 md:space-y-1">
                <h3 className="font-black text-2xl md:text-3xl tracking-tighter text-white leading-tight group-hover:translate-x-1 transition-transform duration-500">{category.name}</h3>
                <p className="text-[10px] md:text-sm font-bold text-white/70 line-clamp-1 group-hover:text-white/90 transition-colors uppercase tracking-widest">Verified Services</p>
              </div>

              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 bg-white/20 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
                Explore Now <ArrowUpRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
              </div>
            </div>
          </CardContent>
          
          {/* Interactive Light Beam */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-[100px] group-hover:bg-white/40 transition-all duration-1000" />
        </Card>
      </Link>
    </MotionDiv>
  );
};
