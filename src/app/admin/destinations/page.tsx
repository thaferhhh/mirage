"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { MapPin, Plus, Search, Edit, Trash2, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الوجهة؟')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDestinations(destinations.filter((d: any) => d.id !== id));
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
            <h1 className="text-3xl font-black text-slate-900 font-tajawal text-primary">إدارة الوجهات السياحية</h1>
            <p className="text-muted text-sm mt-1">عرض وإضافة وتعديل المدن والدول المتاحة على الموقع.</p>
          </div>
          <button className="bg-primary text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            <Plus size={20} />
            <span>إضافة وجهة جديدة</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-5 font-bold">الوجهة</th>
                <th className="px-6 py-5 font-bold">عدد البرامج</th>
                <th className="px-6 py-5 font-bold">الوصف</th>
                <th className="px-6 py-5 font-bold">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted">جاري تحميل البيانات...</td>
                </tr>
              ) : destinations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted">لا توجد وجهات مضافة بعد.</td>
                </tr>
              ) : (
                destinations.map((dest: any) => (
                  <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0">
                          <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                        </div>
                        <div className="font-bold text-sm text-slate-900">{dest.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                        {dest.programsCount} برنامج
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted max-w-xs truncate">
                      {dest.description || 'لا يوجد وصف'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(dest.id)}
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

export default AdminDestinations;
