"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Database, RefreshCw, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSeed = async () => {
    if (!confirm('هل أنت متأكد من رغبتك في حقن البيانات الافتراضية؟ سيؤدي ذلك إلى حذف البيانات الحالية وتجديدها.')) return;
    
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/db/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert('تم حقن البيانات بنجاح! يمكنك الآن مشاهدة المحتوى الجديد في الموقع.');
      } else {
        alert(`حدث خطأ أثناء حقن البيانات: ${data.details || 'سبب غير معروف'}`);
      }
    } catch (error) {
      console.error(error);
      alert('فشل الاتصال بالسيرفر.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleReset = async () => {
    if (!resetPassword) {
      alert('الرجاء إدخال كلمة المرور للمتابعة.');
      return;
    }

    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/db/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: resetPassword }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert(data.message);
        setResetPassword('');
        setShowResetConfirm(false);
      } else {
        alert(data.error || 'حدث خطأ غير متوقع.');
      }
    } catch (error) {
      console.error(error);
      alert('فشل الاتصال بالسيرفر.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-right" dir="rtl">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 font-tajawal">إعدادات النظام وقاعدة البيانات</h1>
          <p className="text-muted text-sm mt-1">إدارة البيانات، الصيانة، وأدوات المطور.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seed Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-6">
              <Database size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 font-tajawal">حقن البيانات (Seed)</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              سيقوم هذا الإجراء بتعبئة قاعدة البيانات بمجموعة من المقالات، العروض، والوجهات الاحترافية المجهزة مسبقاً. مفيد جداً عند الرغبة في ملء الموقع بمحتوى عالي الجودة فوراً.
            </p>
            <button 
              onClick={handleSeed}
              disabled={isSeeding}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
            >
              {isSeeding ? <RefreshCw className="animate-spin" size={20} /> : <Database size={20} />}
              <span>حقن البيانات الاحترافية</span>
            </button>
          </motion.div>

          {/* Reset Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 font-tajawal">تصفير قاعدة البيانات</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              تحذير: سيقوم هذا الإجراء بحذف جميع المقالات، الوجهات، العروض، والاستفسارات من الموقع نهائياً. لا يمكن التراجع عن هذا الإجراء.
            </p>
            
            {!showResetConfirm ? (
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-xl"
              >
                <AlertTriangle size={20} />
                <span>البدء في إجراء التصفير</span>
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative">
                  <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500" size={20} />
                  <input 
                    type="password" 
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور للتأكيد"
                    className="w-full bg-slate-50 border border-rose-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-rose-500/20 outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleReset}
                    disabled={isResetting}
                    className="flex-1 bg-rose-600 text-white font-black py-4 rounded-2xl hover:bg-rose-700 transition-all disabled:opacity-50"
                  >
                    {isResetting ? 'جاري التصفير...' : 'تأكيد المسح الشامل'}
                  </button>
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className="px-6 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Backup & Restore Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6">
              <Database size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 font-tajawal">النسخ الاحتياطي والاستعادة</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              يمكنك تصدير قاعدة البيانات بالكامل إلى ملف خارجي للحتفاظ بها، أو استعادة الموقع من ملف نسخة احتياطية سابق.
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href="/api/admin/db/backup"
                className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
              >
                <Database size={20} />
                <span>تحميل نسخة احتياطية (JSON)</span>
              </a>
              
              <label className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 cursor-pointer transition-all shadow-xl">
                <RefreshCw size={20} />
                <span>استعادة من ملف...</span>
                <input 
                  type="file" 
                  accept=".json" 
                  className="hidden" 
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!confirm('هل أنت متأكد؟ سيؤدي هذا إلى حذف البيانات الحالية واستبدالها بالنسخة الاحتياطية.')) return;
                    
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                      try {
                        const content = JSON.parse(event.target?.result as string);
                        const res = await fetch('/api/admin/db/restore', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(content),
                        });
                        if (res.ok) alert('تم استعادة البيانات بنجاح!');
                        else alert('فشل استعادة البيانات.');
                      } catch (err) {
                        alert('الملف غير صالح.');
                      }
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
