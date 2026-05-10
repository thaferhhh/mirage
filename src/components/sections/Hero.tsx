"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plane, Hotel, Map, Ship, CreditCard, Search, MapPin, Calendar as CalendarIcon, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'flights', label: 'رحلات طيران', icon: Plane },
  { id: 'hotels', label: 'فنادق', icon: Hotel },
  { id: 'packages', label: 'باقات سياحية', icon: Map },
  { id: 'umrah', label: 'عمرة وحج', icon: Ship },
  { id: 'visas', label: 'تأشيرات', icon: CreditCard },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState('packages');

  return (
    <section className="relative h-[850px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/hero-bg.png" 
          alt="Discover the world" 
          fill 
          className="object-cover brightness-[0.75] scale-105" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-background"></div>
      </div>

      <div className="container relative mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-accent font-bold text-sm tracking-widest uppercase"
        >
          اكتشف وجهتك القادمة مع الميراج
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 font-tajawal drop-shadow-2xl leading-tight"
        >
          سافر بـ <span className="text-accent">ذكاء</span> <br />
          وعش بـ <span className="text-secondary underline decoration-secondary/30">سعادة</span>
        </motion.h1>
        
        {/* Search Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-6xl glass-panel rounded-[40px] text-slate-900 overflow-hidden mt-8"
        >
          {/* Tabs */}
          <div className="flex bg-slate-900/5 backdrop-blur-sm p-2 gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-[24px] font-bold transition-all duration-300 whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-white text-primary shadow-lg" 
                    : "text-slate-500 hover:text-primary hover:bg-white/50"
                )}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Departure City (New) */}
              {(activeTab === 'packages' || activeTab === 'flights' || activeTab === 'umrah') && (
                <div className="space-y-3 group text-right">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                    <MapPin size={14} className="text-secondary" />
                    مدينة المغادرة
                  </label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer">
                    <option>بغداد (BGW)</option>
                    <option>الرياض (RUH)</option>
                    <option>جدة (JED)</option>
                    <option>دبي (DXB)</option>
                    <option>أربيل (EBL)</option>
                  </select>
                </div>
              )}

              <div className="space-y-3 group text-right">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                  <Map size={14} className="text-secondary" />
                  الوجهة المستهدفة
                </label>
                <input 
                  type="text" 
                  placeholder={activeTab === 'visas' ? "اختر الدولة..." : "إلى أين تريد الذهاب؟"}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all font-bold"
                />
              </div>

              {/* Month Selector for Packages (New) */}
              {(activeTab === 'packages' || activeTab === 'umrah') ? (
                <div className="space-y-3 group text-right">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                    <CalendarIcon size={14} className="text-secondary" />
                    شهر السفر
                  </label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer">
                    <option>أي وقت</option>
                    <option>مايو 2026</option>
                    <option>يونيو 2026</option>
                    <option>يوليو 2026</option>
                    <option>أغسطس 2026</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-3 group text-right">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                    <CalendarIcon size={14} className="text-secondary" />
                    تاريخ السفر
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all font-bold"
                  />
                </div>
              )}

              <div className="space-y-3 group text-right">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                  <Users size={14} className="text-secondary" />
                  عدد الأفراد
                </label>
                <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer">
                  <option>1 مسافر</option>
                  <option>2 مسافر</option>
                  <option>3 مسافرين</option>
                  <option>عائلة (4+)</option>
                </select>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button className="bg-primary hover:bg-primary/95 text-white font-black py-5 px-16 rounded-3xl flex items-center gap-4 text-xl transition-all transform hover:scale-105 shadow-2xl shadow-primary/30">
                <Search size={24} className="text-secondary" />
                بحث عن العروض
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
