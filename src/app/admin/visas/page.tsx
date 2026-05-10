"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { CreditCard, Plus, Search, Edit, Trash2, Globe, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdminVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await fetch('/api/packages?category=visas');
        const data = await res.json();
        setVisas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه التأشيرة؟')) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVisas(visas.filter((v: any) => v.id !== id));
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
            <h1 className="text-3xl font-black text-slate-900 font-tajawal text-primary">إدارة التأشيرات</h1>
            <p className="text-muted text-sm mt-1">إضافة وتعديل متطلبات وأسعار التأشيرات السياحية.</p>
          </div>
          <Link href="/admin/packages/add?category=visas" className="bg-secondary text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-3 hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20">
            <Plus size={20} />
            <span>إضافة تأشيرة جديدة</span>
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-5 font-bold">التأشيرة</th>
                <th className="px-6 py-5 font-bold">السعر</th>
                <th className="px-6 py-5 font-bold">المدة المتوقعة</th>
                <th className="px-6 py-5 font-bold">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted">جاري تحميل البيانات...</td>
                </tr>
              ) : visas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted">لا توجد تأشيرات مضافة بعد.</td>
                </tr>
              ) : (
                visas.map((visa: any) => (
                  <tr key={visa.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0">
                          <Image src={visa.image} alt={visa.title} fill className="object-cover" />
                        </div>
                        <div className="font-bold text-sm text-slate-900">{visa.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{visa.price} ر.س</td>
                    <td className="px-6 py-4 text-xs text-muted font-bold">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-secondary" />
                        {visa.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/packages/edit/${visa.id}`} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(visa.id)}
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

export default AdminVisas;
