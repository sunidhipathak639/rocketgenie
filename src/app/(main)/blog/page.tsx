import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Sparkles, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { MotionDiv } from '@/lib/motion';

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: 'blog',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
  });

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-32 uppercase-none">
       {/* Premium Header */}
       <div className="bg-white border-b border-slate-100 pt-48 pb-20 mb-20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 text-[15rem] font-black text-slate-50 leading-none select-none pointer-events-none -translate-y-1/2 translate-x-1/4 italic uppercase">
          NEWS
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-start space-y-6 max-w-3xl">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Rocket Genie Journal</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
                INSIGHTS & <br />
                <span className="text-blue-600 italic">MAGAZINE</span>
             </h1>
             <p className="text-xl text-slate-500 font-medium">
                Expert advice, local spotlights, and growth hacks for business owners and users alike.
             </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {posts.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.docs.map((post: any, i: number) => (
              <MotionDiv
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="group h-full bg-white border-none shadow-2xl shadow-slate-200/50 rounded-[40px] overflow-hidden hover:-translate-y-2 transition-all duration-500">
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                      {post.featuredImage ? (
                        <img 
                          src={typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage.url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                           <Sparkles className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Clock className="w-3 h-3" /> 5 Min Read
                         </div>
                         <div className="h-1 w-1 rounded-full bg-slate-200" />
                         <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Growth</div>
                      </div>
                      <CardTitle className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-8 pt-0">
                      <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-8">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                         <span className="text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors">Read Full Article</span>
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </MotionDiv>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[60px] shadow-2xl shadow-slate-200/50 space-y-6">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <BookOpen className="w-8 h-8" />
             </div>
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">No articles yet</h3>
                <p className="text-slate-500 font-medium italic">Our editorial team is busy crafting expert insights. Check back soon.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
