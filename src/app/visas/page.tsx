"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Globe,
  ArrowRight,
  Info
} from 'lucide-react';
import Image from 'next/image';

const VisasPage = () => {
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

  return (
    <main className="min-h-screen bg-slate-50 text-right" dir="rtl">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="خدمات التأشيرات السياحية" 
        items={[{ label: 'التأشيرات' }]} 
        backgroundImage="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-xs font-black mb-6"
            >
              <ShieldCheck size={14} />
              استخراج التأشيرات بكل سهولة
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black font-tajawal text-primary mb-8">سافر إلى أي مكان بدون تعقيدات</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-12">
              نحن في الميراج نختصر عليك الوقت والجهد في استخراج التأشيرات السياحية لمختلف دول العالم. فريقنا المختص يتولى كافة الإجراءات من تعبئة النماذج إلى حجز المواعيد، لنضمن لك تجربة خالية من القلق.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <FileText className="text-secondary" />, label: 'تجهيز الملفات' },
                { icon: <Clock className="text-secondary" />, label: 'متابعة سريعة' },
                { icon: <Globe className="text-secondary" />, label: 'تغطية عالمية' },
                { icon: <CheckCircle className="text-secondary" />, label: 'نسبة قبول عالية' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary">
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visas Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-right">
              <h2 className="text-accent font-black tracking-widest uppercase text-xs mb-3">تأشيرات سياحية</h2>
              <h3 className="text-4xl font-black font-tajawal text-primary">أشهر وجهات التأشيرات</h3>
            </div>
            <div className="w-20 h-1.5 bg-secondary rounded-full hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white rounded-[40px] animate-pulse"></div>
              ))
            ) : visas.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-slate-100">
                <p className="text-slate-400 font-bold">لا توجد تأشيرات مضافة حالياً. يمكنك إضافتها من لوحة التحكم.</p>
              </div>
            ) : (
              visas.map((visa: any, i) => (
                <motion.div
                  key={visa.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[40px] overflow-hidden shadow-premium border border-white hover:border-secondary/20 transition-all flex flex-col h-full"
                >
                  <div className="relative h-56">
                    <Image src={visa.image} alt={visa.title} fill className="object-cover" />
                    <div className="absolute top-6 right-6 bg-secondary text-white px-5 py-2 rounded-2xl font-black text-xs">
                      تبدأ من {visa.price} $
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <h4 className="text-2xl font-black text-slate-900 mb-4 font-tajawal">{visa.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{visa.description}</p>
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Clock size={16} className="text-secondary" />
                        <span>{visa.duration}</span>
                      </div>
                      <button className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-secondary transition-all">
                        <ArrowRight size={20} className="rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="pb-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary text-white p-12 rounded-[40px] flex gap-8 items-center">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0 text-accent">
              <Info size={40} />
            </div>
            <div>
              <h4 className="text-2xl font-black mb-4 font-tajawal">متطلبات عامة</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                تأكد من صلاحية جواز سفرك لمدة لا تقل عن 6 أشهر ووجود صفحات فارغة كافية قبل التقديم على أي تأشيرة.
              </p>
            </div>
          </div>
          <div className="bg-white p-12 rounded-[40px] shadow-premium border border-slate-100 flex gap-8 items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center flex-shrink-0 text-secondary">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h4 className="text-2xl font-black mb-4 font-tajawal text-primary">تأمين السفر</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                نوفر لك بوالص تأمين سفر معتمدة دولياً ومقبولة في جميع السفارات لتغطية الحالات الطارئة أثناء رحلتك.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default VisasPage;
