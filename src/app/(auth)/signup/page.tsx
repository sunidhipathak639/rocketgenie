'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Implementation for signup with Payload
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/auth/auth_bg.png" 
          alt="" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center space-y-2">
           <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-2xl italic">G</span>
              </div>
           </Link>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Join <span className="text-blue-500">Genie</span>
           </h1>
           <p className="text-white/50 text-sm font-medium">Create your account to start your expert journey.</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[40px] overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white h-14 rounded-2xl px-6 focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white h-14 rounded-2xl px-6 focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="email@example.com" 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl px-6 focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-[10px] font-bold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl px-6 focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-[10px] font-bold" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Join the Network
                </Button>
              </form>
            </Form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-white/40 text-sm font-medium">
                Already have an account?{' '}
                <Link href="/login" className="text-white font-black hover:text-blue-400 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
