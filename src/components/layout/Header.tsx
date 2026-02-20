'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchForm } from '@/components/forms/SearchForm';
import { Menu, X, Rocket, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/lib/motion';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500",
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100" 
          : "bg-transparent py-6 border-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className={cn(
            "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
            isScrolled ? "bg-blue-600 shadow-blue-200 text-white" : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
          )}>
            <Rocket className="w-6 h-6 fill-current group-hover:animate-bounce" />
          </div>
          <span className={cn(
            "font-black text-2xl tracking-tighter hidden sm:inline-block transition-colors duration-500",
            isScrolled ? "text-slate-900" : "text-white"
          )}>
            ROCKET<span className="text-blue-500 italic">GENIE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {['Categories', 'About Us', 'Blog'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`} 
              className={cn(
                "text-sm font-black uppercase tracking-widest transition-all relative group",
                isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/70 hover:text-white"
              )}
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
        
        {/* Desktop Search Toggle */}
        <div className="hidden lg:flex flex-1 max-w-sm justify-center">
           {!isScrolled && (
             <div className="w-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
               <SearchForm />
             </div>
           )}
           {isScrolled && <SearchForm />}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("lg:hidden rounded-full", isScrolled ? "text-slate-900" : "text-white bg-white/10 hover:bg-white/20")}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchIcon className="w-5 h-5" />
          </Button>

          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className={cn(
              "font-black uppercase tracking-[0.2em] text-[10px] h-11 px-6 rounded-full transition-all duration-500 hover:scale-105 active:scale-95",
              isScrolled 
                ? "text-slate-900 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-blue-500/20" 
                : "text-white hover:bg-white/20 backdrop-blur-md border border-transparent hover:border-white/20"
            )}>
              Log In
            </Button>
          </Link>
          
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-full shadow-2xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
              Get Started
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("md:hidden rounded-full", isScrolled ? "text-slate-900" : "text-white bg-white/10")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl p-4 border-b border-slate-100 lg:hidden shadow-2xl"
        >
          <SearchForm />
        </MotionDiv>
      )}

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <MotionDiv 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          className="fixed inset-0 top-0 z-[150] bg-white flex flex-col p-8 md:hidden"
        >
          <div className="flex justify-between items-center mb-12">
             <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Rocket className="w-6 h-6 fill-current" />
                </div>
                <span className="font-black text-xl tracking-tighter">ROCKET<span className="text-blue-500 italic">GENIE</span></span>
             </Link>
             <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full bg-slate-100">
               <X className="w-6 h-6" />
             </Button>
          </div>
          
          <div className="space-y-8">
            {['Categories', 'About Us', 'Blog', 'Contact Us'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block text-4xl font-black text-slate-900 tracking-tighter hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4">
             <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-sm font-black uppercase tracking-widest h-16 rounded-2xl border-2">Log In</Button>
             </Link>
             <Link href="/free-business-listing" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-sm font-black uppercase tracking-widest h-16 rounded-2xl bg-slate-900 shadow-xl">List Your Business</Button>
             </Link>
          </div>
        </MotionDiv>
      )}
    </header>
  );
};
