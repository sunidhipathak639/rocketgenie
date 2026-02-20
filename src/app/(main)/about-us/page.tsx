import React from 'react';
import { Rocket, Sparkles, Target, Users, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Verified Partners', value: '1,600+', icon: ShieldCheck },
  { label: 'Cities Covered', value: '15+', icon: Target },
  { label: 'Monthly Users', value: '10k+', icon: Users },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen pb-32 uppercase-none">
       {/* Premium Hero */}
       <div className="bg-slate-900 pt-48 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20" />
          <div className="absolute top-0 right-0 text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none -translate-y-1/2 translate-x-1/4 italic uppercase">
            GENIE
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl space-y-8">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <Rocket className="w-3.5 h-3.5 text-blue-400" />
                  <span>The Rocket Genie Story</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                  EMPOWERING <br />
                  <span className="text-blue-500 italic">LOCAL COMMERCE</span>
               </h1>
               <p className="text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                  We are on a mission to bridge the gap between world-class local services and the people who need them.
               </p>
            </div>
          </div>
       </div>

       {/* Stats Section */}
       <div className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center space-y-4 border border-slate-50">
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <stat.icon className="w-8 h-8" />
                 </div>
                 <div className="space-y-1">
                    <div className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
              </div>
            ))}
          </div>
       </div>

       {/* Content Section */}
       <div className="container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative aspect-square rounded-[60px] bg-slate-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover grayscale brightness-90 contrast-125"
                />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
             </div>

             <div className="space-y-10">
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Our Mission</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                      BEYOND JUST A <br />
                      <span className="text-blue-600">DIRECTORY</span>
                   </h2>
                </div>

                <div className="space-y-6 text-xl text-slate-500 font-medium leading-relaxed">
                   <p>
                      Rocket Genie is your ultimate local business ecosystem, designed to connect users with the absolute best services and businesses in their cities.
                   </p>
                   <p>
                      We believe every local professional deserves a stage that matches their excellence. From master plumbers to cutting-edge digital agencies, we provide the visibility they need to rocket their growth.
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
