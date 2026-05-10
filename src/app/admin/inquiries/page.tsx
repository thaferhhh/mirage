"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Mail, Phone, Calendar, Trash2, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/inquiries');
        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-right" dir="rtl">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 font-tajawal">الرسائل والاستفسارات</h1>
          <p className="text-muted text-sm mt-1">تواصل مباشرة مع عملائك وتابع طلباتهم.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center text-muted font-bold">
              جاري تحميل الرسائل...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center text-muted font-bold">
              لا توجد رسائل جديدة حالياً.
            </div>
          ) : (
            inquiries.map((inquiry: any, index) => (
              <motion.div 
                key={inquiry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Sidebar with Info */}
                  <div className="bg-slate-50 p-6 md:w-64 border-l border-slate-100 space-y-4">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block">
                      {inquiry.subject}
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-slate-900">{inquiry.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar size={12} />
                        {new Date(inquiry.createdAt).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                    <div className="pt-4 space-y-2 border-t">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Phone size={14} className="text-primary" />
                        <span dir="ltr">{inquiry.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Mail size={14} className="text-primary" />
                        <span className="truncate">{inquiry.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="relative">
                      <MessageSquare size={40} className="absolute -top-4 -right-4 text-slate-50 opacity-50" />
                      <p className="text-slate-700 leading-relaxed relative z-10">{inquiry.message}</p>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t flex justify-end gap-3">
                      <button className="flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all">
                        <CheckCircle size={16} />
                        <span>تمييز كمقروء</span>
                      </button>
                      <button className="flex items-center gap-2 px-6 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">
                        <Trash2 size={16} />
                        <span>حذف الرسالة</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminInquiries;
