"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة عملية تسجيل دخول ناجحة للوصول للوحة التحكم
    setTimeout(() => {
      router.push('/admin');
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Illustration & Welcome */}
        <div className="md:w-1/2 bg-gradient-to-br from-secondary/20 to-primary p-12 flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
             <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12">
               <ArrowLeft size={20} className="rotate-180" />
               <span className="font-bold text-sm">العودة للموقع</span>
             </Link>
             
             <h1 className="text-4xl md:text-5xl font-black text-white font-tajawal mb-6 leading-tight">
               مرحباً بك في <br />
               <span className="text-accent">لوحة إدارة الميراج</span>
             </h1>
             <p className="text-white/60 text-lg leading-relaxed max-w-xs">
               سجل دخولك للتحكم في العروض، الوجهات، والرسائل الواردة من عملائك.
             </p>
           </div>
           
           <div className="relative z-10 flex items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 mt-12">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-white font-black text-sm">نظام إدارة آمن</p>
                <p className="text-white/40 text-[10px]">تشفير كامل للبيانات وحماية متقدمة</p>
              </div>
           </div>

           {/* Decorative abstract shape */}
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 bg-white p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-10 text-right">
            <h2 className="text-3xl font-black text-primary font-tajawal mb-2">تسجيل الدخول</h2>
            <p className="text-slate-400 font-bold text-sm">أدخل بيانات الاعتماد الخاصة بك للبدء.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-right">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@mirage.com"
                  className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                />
                <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pr-2">كلمة المرور</label>
              <div className="relative group">
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                />
                <Lock size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-2">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-primary focus:ring-primary" />
                تذكرني
              </label>
              <Link href="#" className="text-primary hover:text-accent transition-colors">نسيت كلمة المرور؟</Link>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-2xl shadow-primary/30 mt-8 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>دخول للوحة التحكم</span>
                  <ArrowLeft size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-slate-400 text-xs font-bold">
            شركة الميراج للسفر والسياحة © 2026 جميع الحقوق محفوظة
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default LoginPage;
