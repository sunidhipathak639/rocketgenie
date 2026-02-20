import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Mail, Globe, Star, Clock, CheckCircle, Share2, Heart, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquireModal } from '@/components/shared/Modal';
import { Card, CardContent } from '@/components/ui/card';
import { MotionDiv } from '@/lib/motion';

export default async function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayload({ config: configPromise });
  const { id } = await params;

  const business = await payload.findByID({
    collection: 'businesses',
    id,
  });

  if (!business) notFound();

  return (
    <div className="bg-slate-50/50 min-h-screen pb-32">
      {/* Premium Hero/Cover Section */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden bg-slate-900">
         {business.images?.[0] ? (
            <img 
               src={typeof business.images[0] === 'string' ? business.images[0] : (typeof business.images[0] === 'object' && 'url' in business.images[0] ? business.images[0].url || '' : '')} 
               alt={business.name}
               className="w-full h-full object-cover opacity-60 scale-105"
            />
         ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-800 font-black text-9xl tracking-tighter opacity-10">GENIE</div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
         
         <div className="absolute bottom-12 left-0 w-full">
            <div className="container mx-auto mx-auto px-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                     <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                        {typeof business.category === 'object' ? business.category?.name : ''}
                     </span>
                     {business.verified && (
                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] flex items-center gap-1">
                           <ShieldCheck className="w-3 h-3 text-blue-400" /> Official Partner
                        </span>
                     )}
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                     {business.name.toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-6 text-white/80">
                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-400 text-slate-900 px-2.5 py-1 rounded-lg text-sm font-black">
                           {business.rating} <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-sm font-bold">{business.reviewCount} Verified Reviews</span>
                     </div>
                     <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {typeof business.city === 'object' ? business.city?.name : ''}
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-md">
                     <Heart className="w-6 h-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-md">
                     <Share2 className="w-6 h-6" />
                  </Button>
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="rounded-[40px] border-none shadow-2xl shadow-slate-200/50 p-8 md:p-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Information</h3>
                        <div className="space-y-5">
                           <div className="flex items-start gap-4 group">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-900">Our Location</p>
                                 {business.googleMapsUrl ? (
                                   <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 font-bold hover:underline">
                                     {business.address}, {typeof business.city === 'object' ? business.city?.name : ''}
                                   </a>
                                 ) : (
                                   <p className="text-sm text-slate-500 font-medium">{business.address}, {typeof business.city === 'object' ? business.city?.name : ''}</p>
                                 )}
                              </div>
                           </div>
                           <div className="flex items-start gap-4 group">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <Phone className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-900">Direct Line</p>
                                 <p className="text-sm text-slate-500 font-medium">{business.phone?.[0]?.number || 'Available on request'}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Digital Presence</h3>
                        <div className="space-y-5">
                           <div className="flex items-start gap-4 group">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-900">Email Address</p>
                                 <p className="text-sm text-slate-500 font-medium">{business.email?.[0]?.address || 'Available on request'}</p>
                              </div>
                           </div>
                           {business.website && (
                              <div className="flex items-start gap-4 group">
                                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Globe className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-slate-900">Official Website</p>
                                    <a href={business.website} target="_blank" className="text-sm text-blue-600 font-bold hover:underline">Visit Site</a>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-12 border-t border-slate-50 space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Professional Profile</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                    {typeof business.description === 'string' ? business.description : 'Welcome to our premium establishment. We pride ourselves on delivering exceptional quality and service. Contact us to learn more about our specialized offerings.'}
                  </div>
               </div>
            </Card>

            {/* Gallery Section */}
            <div className="space-y-6">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Gallery & Portfolio</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="aspect-square rounded-[32px] bg-slate-200 overflow-hidden group">
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                           <Sparkles className="w-8 h-8 opacity-20 group-hover:scale-110 transition-transform" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="rounded-[40px] border-none shadow-2xl shadow-slate-200/50 p-8 sticky top-24">
               <div className="space-y-8">
                  <div className="p-8 bg-blue-600 rounded-[32px] text-white space-y-4 relative overflow-hidden shadow-2xl shadow-blue-500/40">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                     <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-black leading-none">NEED A <br /> QUOTE?</h3>
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest leading-relaxed">Fast response within 24 hours guaranteed by Genie.</p>
                        <EnquireModal businessId={String(business.id)} businessName={business.name} />
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                           <Clock className="w-4 h-4 text-blue-600" /> Opening Hours
                        </h4>
                        <span className="text-[10px] font-black px-2 py-1 rounded bg-green-100 text-green-700 uppercase tracking-widest">Open Now</span>
                     </div>
                     <ul className="space-y-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                           <li key={day} className="flex justify-between text-sm font-bold">
                              <span className="text-slate-400">{day}</span>
                              <span className="text-slate-900">09:00 AM - 06:00 PM</span>
                           </li>
                        ))}
                        <li className="flex justify-between text-sm font-bold">
                           <span className="text-slate-400">Saturday</span>
                           <span className="text-slate-400 uppercase text-xs tracking-widest">Closed</span>
                        </li>
                        <li className="flex justify-between text-sm font-bold">
                           <span className="text-slate-400">Sunday</span>
                           <span className="text-slate-400 uppercase text-xs tracking-widest">Closed</span>
                        </li>
                     </ul>
                  </div>

                  <div className="pt-8 border-t border-slate-50">
                     <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <TrendingUp className="w-5 h-5" />
                           </div>
                           <p className="font-black text-slate-900 uppercase tracking-tight text-sm">Genie Insights</p>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                           This business is in the <span className="text-slate-900 font-bold">top 5%</span> of its category this month. High customer satisfaction rate.
                        </p>
                     </div>
                  </div>
               </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
