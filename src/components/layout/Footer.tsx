import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, Mail, MapPin, Phone, Github, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0A0C10] text-slate-400 pt-20 md:pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8 text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20">
                <Rocket className="w-7 h-7 fill-current" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">
                ROCKET<span className="text-blue-600">GENIE</span>
              </span>
            </Link>
            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto md:mx-0 text-slate-300">
              The premium directory for high-quality local businesses. We verify every listing to ensure you get the best expert for your needs.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Platform</h4>
              <ul className="space-y-4 text-sm font-bold">
                {['Categories', 'Search', 'Featured', 'New Listings'].map(item => (
                  <li key={item}><Link href="#" className="hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm font-bold">
                {['About Us', 'Our Blog', 'Contact', 'Privacy Policy'].map(item => (
                  <li key={item}><Link href="#" className="hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Resources</h4>
              <ul className="space-y-4 text-sm font-bold">
                {['Free Listing', 'Pricing', 'Advertise', 'Guidelines'].map(item => (
                  <li key={item}><Link href="#" className="hover:text-blue-500 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="bg-white/5 rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10 mb-24">
           <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white">Join the Newsletter</h3>
              <p className="font-medium text-slate-500 max-w-sm">Get the best local deals and expert tips directly in your inbox.</p>
           </div>
           <form className="flex flex-col sm:flex-row w-full md:w-auto gap-4 lg:gap-5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-2xl px-6 h-16 md:w-96 text-white font-bold outline-none focus:border-blue-500 transition-all flex-1 text-lg placeholder:text-slate-600"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-16 px-12 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
                 Join Now <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
           </form>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
           <p className="opacity-50">© {currentYear} ROCKET GENIE. <br className="sm:hidden" /> ALL RIGHTS RESERVED.</p>
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};
