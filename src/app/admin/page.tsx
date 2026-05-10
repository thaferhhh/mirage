"use client";

import React from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Package, Users, MessageSquare, TrendingUp, Calendar, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'إجمالي العروض', value: '45', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'طلبات الحجز', value: '128', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'الاستفسارات الجديدة', value: '12', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'المشاهدات اليومية', value: '1,240', icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-50' },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-tajawal">مرحباً بك، أدمن الميراج 👋</h1>
            <p className="text-muted text-sm mt-1">هذا ما يحدث في موقعك اليوم.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all relative">
              <Bell size={22} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 bg-white p-2 pl-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-primary rounded-lg"></div>
              <div>
                <p className="text-xs font-bold text-slate-900">أحمد المدير</p>
                <p className="text-[10px] text-muted">مسؤول النظام</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted mb-1 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Inquiries */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-lg">آخر الاستفسارات</h3>
              <button className="text-sm text-primary font-bold hover:underline">عرض الكل</button>
            </div>
            <div className="p-0">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-bold">العميل</th>
                    <th className="px-6 py-4 font-bold">الخدمة</th>
                    <th className="px-6 py-4 font-bold">التاريخ</th>
                    <th className="px-6 py-4 font-bold">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm">محمد عبدالله</p>
                        <p className="text-xs text-muted">+964 770...</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">حجز رحلة لتركيا</td>
                      <td className="px-6 py-4 text-xs text-muted">منذ 2 ساعة</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">قيد المراجعة</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed or Settings Shortcut */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-6">نشاطات سريعة</h3>
            <div className="space-y-6">
              {[
                { title: 'تم إضافة عرض جديد', time: 'منذ 10 دقائق', icon: Package, color: 'bg-blue-50 text-blue-500' },
                { title: 'تعديل سياسة الخصوصية', time: 'منذ ساعة', icon: Settings, color: 'bg-slate-50 text-slate-500' },
                { title: 'رسالة جديدة من "سارة"', time: 'منذ 3 ساعات', icon: MessageSquare, color: 'bg-emerald-50 text-emerald-500' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", activity.color)}>
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                    <p className="text-[10px] text-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl transition-all text-sm border border-slate-100">
              سجل النشاطات الكامل
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple CN helper since I can't import easily in one-shot sometimes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdminDashboard;
