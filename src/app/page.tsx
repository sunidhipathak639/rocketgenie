import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { MotionDiv } from '@/lib/motion';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: 'categories',
    limit: 12,
    sort: 'order',
  });

  const featuredBusinesses = await payload.find({
    collection: 'businesses',
    limit: 6,
    where: { status: { equals: 'active' } },
    sort: '-rating',
  });

  return (
    <div className="bg-white min-h-screen">
      <HeroSection />

      {/* Featured Categories Grid */}
      <section className="py-32 bg-[#fafbfc] relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-0 right-0 text-[20rem] font-black text-slate-100/50 leading-none select-none pointer-events-none -translate-y-1/2 translate-x-1/4 italic">
          GENIE
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premium Services</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                EXPLORE <br />
                <span className="text-blue-600 italic">CATEGORIES</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                The most comprehensive directory of verified local experts. 
                Filter by service, rating, and location to find your perfect match.
              </p>
            </div>
            <Link href="/categories" className="group">
              <Button variant="outline" className="rounded-full px-10 h-14 font-black border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 uppercase tracking-widest text-xs">
                View All Categories 
                <div className="ml-3 p-1 rounded-full bg-slate-900 text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.docs.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Recommendations */}
      <section className="py-40 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8 mb-24 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Now</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
               TOP RATED <br />
               <span className="text-indigo-600">PARTNERS</span>
             </h2>
             <p className="text-xl text-slate-500 font-medium leading-relaxed">
               Hand-picked businesses that have consistently delivered 
               exceptional quality and received outstanding customer feedback.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredBusinesses.docs.map((business, i) => (
              <BusinessCard key={business.id} business={business} index={i} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/search">
               <Button className="h-16 px-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/20 transition-all hover:scale-105">
                 Expand Search Results
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
         {/* Background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[150px] pointer-events-none" />
         
         <div className="container mx-auto mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
               {[
                 { icon: Zap, value: '25k+', label: 'Daily Searches', color: 'text-blue-400' },
                 { icon: Globe, value: '15+', label: 'Cities Covered', color: 'text-indigo-400' },
                 { icon: Users, value: '100k+', label: 'Happy Users', color: 'text-purple-400' },
                 { icon: ShieldCheck, value: '1,700+', label: 'Verified Partners', color: 'text-emerald-400' },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                    <div className={cn("p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500", stat.color)}>
                       <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                       <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1">{stat.value}</div>
                       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">{stat.label}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Business Owner CTA */}
      <section className="py-40 bg-white">
        <div className="container mx-auto mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[64px] p-12 md:p-24 relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-white/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[60%] bg-blue-400/20 rounded-full blur-[80px]" />
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                      Partner Program
                   </div>
                   <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                     LIST YOUR <br />
                     <span className="text-blue-200 italic font-medium">BUSINESS</span>
                   </h2>
                   <p className="text-xl md:text-2xl text-blue-100/80 font-medium leading-relaxed max-w-lg">
                      Join India&apos;s fastest growing service network. 
                      Unlock premium features, get a verified badge, and connect 
                      with high-intent customers in your area.
                   </p>
                   <div className="flex flex-wrap gap-6 pt-4">
                      <Link href="/free-business-listing">
                         <Button className="h-16 px-12 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105">
                           Start Free Listing
                         </Button>
                      </Link>
                      <Link href="/advertise">
                         <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/30 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs backdrop-blur-sm transition-all hover:border-white/60">
                           View Ad Plans
                         </Button>
                      </Link>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { title: 'Verified Badge', desc: 'Build instant trust with a premium checkmark.' },
                     { title: 'Priority Search', desc: 'Appear at the top of category results.' },
                     { title: 'Performance Hub', desc: 'Deep analytics on customer behavior.' },
                     { title: 'Direct Leads', desc: 'Receive enquiries direct to your inbox.' },
                   ].map((feature, i) => (
                     <div key={i} className="p-8 rounded-[36px] bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/15 transition-all">
                        <h4 className="text-xl font-black text-white mb-3 tracking-tight leading-none">{feature.title}</h4>
                        <p className="text-sm font-medium text-blue-100/60 leading-relaxed">{feature.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

