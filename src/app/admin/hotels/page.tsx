"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Hotel, Plus, Search, Edit, Trash2, Eye, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/packages?category=hotels');
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الفندق؟')) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHotels(hotels.filter((h: any) => h.id !== id));
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
            <h1 className="text-3xl font-black text-slate-900 font-tajawal text-primary">إدارة الفنادق والمنتجعات</h1>
            <p className="text-muted text-sm mt-1">عرض وإضافة وتعديل قائمة الفنادق المتاحة.</p>
          </div>
          <Link href="/admin/packages/add?category=hotels" className="bg-secondary text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-3 hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20">
            <Plus size={20} />
            <span>إضافة فندق جديد</span>
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-5 font-bold">الفندق</th>
                <th className="px-6 py-5 font-bold">الموقع</th>
                <th className="px-6 py-5 font-bold">السعر لليلة</th>
                <th className="px-6 py-5 font-bold">الحالة</th>
                <th className="px-6 py-5 font-bold">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted">جاري تحميل البيانات...</td>
                </tr>
              ) : hotels.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted">لا توجد فنادق مضافة بعد.</td>
                </tr>
              ) : (
                hotels.map((hotel: any) => (
                  <tr key={hotel.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0">
                          <Image src={hotel.image} alt={hotel.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{hotel.title}</p>
                          <div className="flex items-center gap-1">
                            <Star size={10} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] text-muted">5 نجوم</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{hotel.location}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{hotel.price} ر.س</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">نشط</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/packages/edit/${hotel.id}`} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(hotel.id)}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
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
        </div>
      </main>
    </div>
  );
};

export default AdminHotels;
