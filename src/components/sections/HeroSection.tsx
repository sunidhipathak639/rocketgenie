'use client';

import React from 'react';
import { MotionDiv, MotionSection, fadeInUp, staggerContainer } from '@/lib/motion';
import { SearchForm } from '@/components/forms/SearchForm';
import { CitySelector } from '@/components/shared/CitySelector';
import { Sparkles, MapPin, Search } from 'lucide-react';

const FloatingIcon = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <MotionDiv
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ repeat: Infinity, duration: 4, delay }}
    className={className}
  >
    {children}
  </MotionDiv>
);

export const HeroSection = () => {
  return (
    <MotionSection 
      initial="initial"
      animate="animate"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden bg-[#020617]"
    >
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <FloatingIcon className="absolute top-1/4 left-24 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" delay={0}>
          <Search className="w-8 h-8 text-blue-400" />
        </FloatingIcon>
        <FloatingIcon className="absolute top-1/3 right-32 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" delay={1}>
          <MapPin className="w-8 h-8 text-indigo-400" />
        </FloatingIcon>
        <FloatingIcon className="absolute bottom-1/4 left-1/3 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" delay={2}>
          <Sparkles className="w-8 h-8 text-purple-400" />
        </FloatingIcon>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <MotionDiv 
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center space-y-12"
        >
          {/* Badge */}
          <MotionDiv variants={fadeInUp} className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-blue-300 text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              India&apos;s Premium Service Network
            </div>
          </MotionDiv>

          {/* Heading */}
          <MotionDiv variants={fadeInUp} className="space-y-8">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] md:leading-[0.85] filter drop-shadow-2xl">
              FIND YOUR <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 animate-gradient">
                NEXT EXPERT
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed opacity-80 px-4 md:px-0">
              Rocket Genie is the bridge between you and verified local professionals. 
              Discover premium services delivered to your doorstep.
            </p>
          </MotionDiv>

          {/* Improved Search Integration */}
          <MotionDiv 
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex flex-col md:flex-row items-stretch gap-2 bg-slate-900/80 backdrop-blur-3xl p-3 rounded-[28px] border border-white/10 shadow-2xl">
              <div className="flex-1 md:w-[35%] min-w-0">
                <CitySelector />
              </div>
              <div className="hidden md:block w-px h-10 self-center bg-white/10 mx-2" />
              <div className="flex-[2] relative min-w-0">
                <SearchForm />
              </div>
            </div>
          </MotionDiv>

        </MotionDiv>
      </div>

    </MotionSection>
  );
};
