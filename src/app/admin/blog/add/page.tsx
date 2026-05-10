"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Save, ArrowRight, Image as ImageIcon, BookOpen, User, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddBlogPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: 'الميراج للسفر',
    tags: 'نصائح سفر',
  });

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormData({ ...formData, content: e.currentTarget.innerHTML });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/admin/blog');
      } else {
        alert('حدث خطأ أثناء حفظ المقال');
      }
    } catch (error) {
      console.error(error);
      alert('فشل الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-right" dir="rtl">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin/blog" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-tajawal">إضافة مقال جديد</h1>
            <p className="text-muted text-sm mt-1">شارك خبراتك ونصائح السفر مع عملائك باستخدام المحرر المتقدم.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pr-2">عنوان المقال</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  type="text" 
                  placeholder="مثال: أفضل 10 وجهات سياحية في صيف 2026" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg"
                />
              </div>

              {/* Advanced Toolbar */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pr-2">محتوى المقال</label>
                <div className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-50">
                  <div className="flex flex-wrap gap-1 p-2 bg-white border-b border-slate-100">
                    {[
                      { icon: 'B', cmd: 'bold', label: 'عريض' },
                      { icon: 'I', cmd: 'italic', label: 'مائل' },
                      { icon: 'U', cmd: 'underline', label: 'تحته خط' },
                      { icon: 'H1', cmd: 'formatBlock', val: 'h1', label: 'عنوان 1' },
                      { icon: 'H2', cmd: 'formatBlock', val: 'h2', label: 'عنوان 2' },
                      { icon: '•', cmd: 'insertUnorderedList', label: 'قائمة' },
                      { icon: '1.', cmd: 'insertOrderedList', label: 'قائمة رقمية' },
                      { icon: '≡', cmd: 'justifyRight', label: 'يمين' },
                      { icon: '═', cmd: 'justifyCenter', label: 'وسط' },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => execCommand(btn.cmd, btn.val)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 font-black text-sm transition-all"
                        title={btn.label}
                      >
                        {btn.icon}
                      </button>
                    ))}
                  </div>
                  <div 
                    contentEditable
                    onInput={handleContentChange}
                    className="w-full p-8 min-h-[500px] focus:outline-none bg-white prose prose-slate max-w-none text-right leading-relaxed"
                    style={{ direction: 'rtl' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-lg border-b pb-4 mb-4">إعدادات النشر</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                  <ImageIcon size={16} className="text-secondary" />
                  رابط صورة المقال
                </label>
                <input 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  type="text" 
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                  <User size={16} className="text-secondary" />
                  اسم الكاتب
                </label>
                <input 
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                  <Tag size={16} className="text-secondary" />
                  التصنيف (التاغ)
                </label>
                <input 
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50"
                >
                  <Save size={24} />
                  {loading ? 'جاري الحفظ...' : 'نشر المقال الآن'}
                </button>
              </div>
            </div>

            {/* Preview Hint */}
            <div className="bg-secondary/10 p-6 rounded-[30px] border border-secondary/20">
               <p className="text-xs text-secondary font-bold leading-relaxed text-center">
                 تذكر استخدام صور عالية الجودة لزيادة جاذبية المقال وجذب المزيد من الزوار.
               </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddBlogPost;
