"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
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
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">المقال غير موجود.</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-right" dir="rtl">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:gap-3 transition-all">
          <ArrowRight size={20} className="rotate-0" />
          <span>العودة للمدونة</span>
        </Link>

        <article className="bg-white rounded-[40px] overflow-hidden shadow-premium border border-slate-100 max-w-4xl mx-auto">
          <div className="relative h-[400px] w-full">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="p-10 md:p-16">
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-secondary" />
                <span>{new Date(post.createdAt).toLocaleDateString('ar-EG')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-secondary" />
                <span>{post.author}</span>
              </div>
              {post.tags && (
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-secondary" />
                  <span>{post.tags}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black font-tajawal text-slate-900 mb-10 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none text-slate-600 leading-loose font-tajawal">
              {post.content.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-6">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
