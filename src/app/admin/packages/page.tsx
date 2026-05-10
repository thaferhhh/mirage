"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Package, Plus, Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا العرض؟')) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages(packages.filter((p: any) => p.id !== id));
      } else {
        alert('حدث خطأ أثناء الحذف');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-right" dir="rtl">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-tajawal">إدارة العروض والباقات</h1>
            <p className="text-muted text-sm mt-1">عرض وإضافة وتعديل البرامج السياحية.</p>
          </div>
          <Link href="/admin/packages/add" className="bg-primary text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            <Plus size={20} />
            <span>إضافة عرض جديد</span>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <input 
              type="text" 
              placeholder="ابحث عن عرض بالاسم أو الموقع..." 
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 font-bold text-sm outline-none">
            <option>جميع التصنيفات</option>
            <option>رحلات دولية</option>
            <option>عمرة وحج</option>
            <option>عروض صيفية</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 font-bold text-sm outline-none">
            <option>الحالة: الكل</option>
            <option>نشط</option>
            <option>مسودة</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-5 font-bold">العرض</th>
                <th className="px-6 py-5 font-bold">الموقع</th>
                <th className="px-6 py-5 font-bold">السعر</th>
                <th className="px-6 py-5 font-bold">المدة</th>
                <th className="px-6 py-5 font-bold">الحالة</th>
                <th className="px-6 py-5 font-bold">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted">جاري تحميل البيانات...</td>
                </tr>
              ) : packages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted">لا توجد عروض مضافة بعد.</td>
                </tr>
              ) : (
                packages.map((pkg: any) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0">
                          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{pkg.title}</p>
                          <p className="text-[10px] text-muted">{pkg.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{pkg.location}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{pkg.price} ر.س</p>
                      {pkg.oldPrice && <p className="text-[10px] text-muted line-through">{pkg.oldPrice} ر.س</p>}
                    </td>
                    <td className="px-6 py-4 text-xs text-muted font-bold">{pkg.duration}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">نشط</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors" title="معاينة">
                          <Eye size={16} />
                        </button>
                        <Link href={`/admin/packages/edit/${pkg.id}`} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors" title="تعديل">
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(pkg.id)}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors" 
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
            <p className="text-xs text-muted">عرض 1 إلى {packages.length} من أصل {packages.length} عروض</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">السابق</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">التالي</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPackages;
