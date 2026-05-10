"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Save, ArrowRight, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Suspense } from 'react';

const AddPackageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'packages';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    oldPrice: '',
    discount: '',
    duration: '',
    location: '',
    category: initialCategory,
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/admin/packages');
      } else {
        alert('حدث خطأ أثناء حفظ البيانات');
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
          <Link href="/admin/packages" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-tajawal">إضافة عرض جديد</h1>
            <p className="text-muted text-sm mt-1">قم بتعبئة البيانات أدناه لنشر رحلة جديدة على الموقع.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-lg border-b pb-4">المعلومات الأساسية</h3>
              
              <div className="space-y-2">
                <label className="font-bold text-sm text-slate-700">عنوان العرض</label>
                <input 
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text" 
                  placeholder="مثال: رحلة الصيف إلى جزر المالديف" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-slate-700">وصف الرحلة</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6} 
                  placeholder="اكتب تفاصيل الرحلة والبرنامج هنا..." 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700">الوجهة (الموقع)</label>
                  <input 
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text" 
                    placeholder="مثال: المالديف، تركيا، دبي" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700">المدة</label>
                  <input 
                    required
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    type="text" 
                    placeholder="مثال: 4 أيام / 3 ليالي" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-lg border-b pb-4">الأسعار والخصومات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700">السعر الحالي (ر.س)</label>
                  <input 
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number" 
                    placeholder="0.00" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700">السعر قبل الخصم</label>
                  <input 
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    type="number" 
                    placeholder="0.00" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700">نسبة الخصم (%)</label>
                  <input 
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    type="number" 
                    placeholder="0" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-lg border-b pb-4">التصنيف والصورة</h3>
              
              <div className="space-y-2">
                <label className="font-bold text-sm text-slate-700">تصنيف العرض</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  <option value="packages">برامج سياحية</option>
                  <option value="flights">حجوزات طيران</option>
                  <option value="hotels">فنادق</option>
                  <option value="umrah">عمرة وحج</option>
                  <option value="visas">تأشيرات</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-slate-700">رابط صورة العرض</label>
                <div className="relative">
                  <input 
                    required
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    type="text" 
                    placeholder="http://..." 
                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <ImageIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                </div>
                <p className="text-[10px] text-muted">استخدم روابط الصور من Unsplash للمعاينة حالياً.</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <input 
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  type="checkbox" 
                  className="w-5 h-5 rounded text-primary focus:ring-primary" 
                />
                <label htmlFor="isFeatured" className="font-bold text-sm text-primary cursor-pointer">تمييز هذا العرض في الرئيسية</label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50"
              >
                <Save size={24} />
                {loading ? 'جاري الحفظ...' : 'حفظ ونشر العرض'}
              </button>
              <Link href="/admin/packages" className="w-full mt-4 flex items-center justify-center text-slate-500 font-bold text-sm hover:text-slate-700 py-2">
                إلغاء الأمر
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

const AddPackagePage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">جاري التحميل...</div>}>
      <AddPackageContent />
    </Suspense>
  );
};

export default AddPackagePage;
