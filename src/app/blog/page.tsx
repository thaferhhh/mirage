"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-right" dir="rtl">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="المدونة ونصائح السفر" 
        items={[{ label: 'المقالات' }]} 
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-secondary font-black tracking-widest uppercase text-xs mb-3">رحلة المعرفة</h2>
              <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary leading-tight">أحدث المقالات والنصائح</h3>
            </div>
            <div className="w-20 h-1.5 bg-accent rounded-full hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[40px] h-96 animate-pulse border border-slate-100"></div>
              ))
            ) : posts.length === 0 ? (
              <div className="col-span-full py-20 text-center font-bold text-slate-400 bg-white rounded-[40px] border border-dashed">
                قريباً... سنقوم بنشر مواضيع شيقة عن السفر.
              </div>
            ) : (
              posts.map((post: any, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[40px] overflow-hidden shadow-premium border border-slate-100 group hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/blog/${post.id}`} className="block relative h-64 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-6 right-6 bg-accent text-white px-5 py-2 rounded-2xl font-black text-[10px] shadow-xl">
                      {post.tags || 'نصائح'}
                    </div>
                  </Link>

                  <div className="p-10">
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-secondary" />
                        {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="text-secondary" />
                        {post.author}
                      </span>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <h4 className="text-2xl font-black text-slate-900 mb-6 font-tajawal group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>

                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest group-hover:text-accent transition-all"
                    >
                      <span>اقرأ المزيد</span>
                      <div className="w-8 h-[2px] bg-primary/20 group-hover:bg-accent group-hover:w-12 transition-all"></div>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
