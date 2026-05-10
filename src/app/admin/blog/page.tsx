"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Plus, Edit, Trash2, BookOpen, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AdminBlogPage = () => {
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

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p: any) => p.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-right" dir="rtl">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-tajawal">إدارة المدونة</h1>
            <p className="text-muted text-sm mt-1">أضف وحدث نصائح السفر وأخبار الشركة.</p>
          </div>
          <Link href="/admin/blog/add" className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            <Plus size={20} />
            إضافة مقال جديد
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center text-muted font-bold animate-pulse">جاري تحميل المقالات...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-center text-muted">
              لا توجد مقالات حالياً. ابدأ بإضافة أول مقال لك!
            </div>
          ) : (
            posts.map((post: any) => (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                <div className="relative h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 font-tajawal line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <div className="pt-6 border-t border-slate-50 flex justify-end gap-2">
                    <Link href={`/admin/blog/edit/${post.id}`} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminBlogPage;
