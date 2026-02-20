import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'support@rocketgenie.co.in',
    description: 'Our team typically responds within 24 business hours.',
    actionText: 'Send Email',
    href: 'mailto:support@rocketgenie.co.in'
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 800-GENIE-PRO',
    description: 'Available Mon-Fri, 9:00 AM to 6:00 PM IST.',
    actionText: 'Call Now',
    href: 'tel:+918001234567'
  }
];

export default function ContactUsPage() {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32 uppercase-none">
       {/* Premium Header */}
       <div className="bg-white border-b border-slate-100 pt-48 pb-24 mb-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Support Center</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
                GET IN <br />
                <span className="text-blue-600 italic">TOUCH</span>
             </h1>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Have questions about our platform or need assistance with your listing? Our dedicated support team is here to help you rocket your business.
             </p>
          </div>
       </div>

       <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {/* Contact Info Cards */}
             <div className="lg:col-span-1 space-y-6">
                {contactMethods.map((method, i) => (
                  <Card key={i} className="rounded-[40px] border-none shadow-2xl shadow-slate-200/50 p-10 space-y-6 group hover:bg-blue-600 transition-all duration-500">
                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        <method.icon className="w-8 h-8" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-100">{method.title}</h3>
                        <p className="text-lg font-black text-slate-900 group-hover:text-white transition-colors">{method.value}</p>
                        <p className="text-sm font-medium text-slate-400 group-hover:text-blue-100/70 transition-colors leading-relaxed">
                           {method.description}
                        </p>
                     </div>
                     <a href={method.href} className="block pt-2">
                        <Button variant="outline" className="w-full rounded-2xl border-slate-100 bg-slate-50 font-black uppercase tracking-widest text-[10px] h-12 group-hover:bg-white group-hover:text-blue-600 group-hover:border-transparent transition-all">
                           {method.actionText}
                        </Button>
                     </a>
                  </Card>
                ))}

                <div className="bg-slate-900 rounded-[40px] p-10 text-white space-y-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                   <h3 className="text-2xl font-black leading-tight italic">
                      WE ARE HERE <br />
                      TO SERVE YOU.
                   </h3>
                   <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" /> Trusted Support
                   </div>
                </div>
             </div>

             {/* Main Contact Form Placeholder */}
             <div className="lg:col-span-2">
                <Card className="rounded-[60px] border-none shadow-2xl shadow-slate-200/80 p-12 md:p-20 bg-white relative overflow-hidden h-full">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <h2 className="text-3xl font-black text-slate-900 tracking-tight">Send a Message</h2>
                         <p className="text-slate-500 font-medium italic">Our inquiry form is currently being optimized for luxury experience. Please use the direct email or call methods in the meantime.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-20 pointer-events-none select-none">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                            <div className="h-14 bg-slate-100 rounded-2xl" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="h-14 bg-slate-100 rounded-2xl" />
                         </div>
                         <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                            <div className="h-40 bg-slate-100 rounded-[32px]" />
                         </div>
                      </div>

                      <Button disabled className="w-full h-16 rounded-[24px] bg-slate-100 text-slate-400 font-black uppercase tracking-widest pointer-events-none">
                         <Send className="w-5 h-5 mr-3" /> Sending Disabled
                      </Button>
                   </div>
                </Card>
             </div>
          </div>
       </div>
    </div>
  );
}
