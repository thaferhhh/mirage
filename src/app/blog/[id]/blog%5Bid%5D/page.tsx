"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Clock, Tag, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SinglePostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return <div className="min-h-screen flex items-center justify-center">المقال غير موجود</div>;

  return (
    <main className="min-h-screen bg-white text-right" dir="rtl">
      <Header />
      <Navbar />

      <article className="pb-24">
        {/* Article Header */}
        <header className="relative h-[500px] w-full">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
          
          <div className="container relative mx-auto px-4 h-full flex flex-col justify-end">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-8 md:p-12 rounded-t-[50px] shadow-2xl shadow-slate-200 border-t border-r border-l border-slate-100 max-w-4xl"
             >
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                   <span className="flex items-center gap-2">
                     <Calendar size={14} className="text-secondary" />
                     {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                   </span>
                   <span className="flex items-center gap-2">
                     <User size={14} className="text-secondary" />
                     بواسطة: {post.author}
                   </span>
                   <span className="flex items-center gap-2">
                     <Tag size={14} className="text-secondary" />
                     {post.tags}
                   </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-tajawal leading-tight">
                  {post.title}
                </h1>
             </motion.div>
          </div>
        </header>

        <div className="container mx-auto px-4 mt-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Content */}
            <div className="lg:w-2/3">
               <div className="prose prose-xl max-w-none text-slate-700 leading-relaxed space-y-6 font-medium">
                  {post.content.split('\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
               </div>
               
               {/* Share & Tags */}
               <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xs text-slate-400 uppercase tracking-widest">مشاركة المقال:</span>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                       <Share2 size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all">
                       <MessageCircle size={18} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="px-4 py-1.5 bg-slate-50 rounded-full text-xs font-bold text-slate-500">#نصائح_سفر</span>
                    <span className="px-4 py-1.5 bg-slate-50 rounded-full text-xs font-bold text-slate-500">#الميراج</span>
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
               <div className="sticky top-24 space-y-8">
                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <h4 className="text-xl font-black mb-6 font-tajawal text-primary">اشترك في النشرة البريدية</h4>
                    <p className="text-sm text-slate-500 mb-6 font-bold leading-relaxed">كن أول من يعرف عن أحدث العروض والوجهات السياحية الجديدة.</p>
                    <div className="space-y-4">
                      <input type="email" placeholder="بريدك الإلكتروني" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      <button className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all">اشترك الآن</button>
                    </div>
                  </div>

                  <div className="bg-primary text-white p-8 rounded-[40px] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                     <h4 className="text-xl font-black mb-4 font-tajawal relative z-10">هل تخطط لرحلتك القادمة؟</h4>
                     <p className="text-white/60 text-sm mb-8 leading-relaxed relative z-10 font-medium">دعنا نساعدك في تخطيط رحلة العمر بأفضل الأسعار وبأعلى معايير الجودة.</p>
                     <Link href="/contact" className="inline-flex items-center gap-3 bg-accent text-white font-black px-8 py-3 rounded-2xl shadow-xl hover:scale-105 transition-all relative z-10">
                        تواصل معنا
                        <ArrowRight size={18} className="rotate-180" />
                     </Link>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default SinglePostPage;
