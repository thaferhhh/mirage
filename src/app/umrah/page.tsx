"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { Ship, Hotel, Bus, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const umrahPackages = [
  {
    name: 'باقة العمرة الاقتصادية',
    price: 1200,
    nights: '4 ليالي',
    hotel: 'فندق 3 نجوم',
    transport: 'حافلات حديثة',
    features: ['شامل التأشيرة', 'السكن في مكة', 'توصيل للمطار']
  },
  {
    name: 'باقة العمرة الفاخرة',
    price: 2500,
    nights: '5 ليالي',
    hotel: 'فندق 5 نجوم (إطلالة حرم)',
    transport: 'سيارة خاصة',
    features: ['شامل التأشيرة', 'السكن في مكة والمدينة', 'إفطار بوفيه', 'هدايا تذكارية']
  },
  {
    name: 'باقة الـ VIP للعمرة',
    price: 4800,
    nights: '7 ليالي',
    hotel: 'أجنحة فاخرة (وقف الملك عبدالعزيز)',
    transport: 'جمس عائلي خاص',
    features: ['شامل التأشيرة VIP', 'استقبال خاص في المطار', 'وجبات كاملة', 'جولات للمزارات']
  }
];

const UmrahPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="خدمات العمرة والحج" 
        items={[{ label: 'برامج العمرة' }]} 
        backgroundImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop" 
                alt="Mecca" 
                fill 
                className="object-cover"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 font-tajawal text-primary">رحلة إيمانية لا تُنسى</h2>
              <p className="text-muted leading-relaxed mb-6 text-lg">
                نفخر في شركة الميراج بتقديم أرقى خدمات العمرة والحج، حيث نضع بين يديكم خبرتنا الطويلة لضمان راحتكم وطمأنينتكم أثناء أداء المناسك.
              </p>
              <p className="text-muted leading-relaxed mb-10 text-lg">
                نوفر لكم باقات متنوعة تشمل الإقامة في أفخم الفنادق القريبة من الحرمين الشريفين، مع وسائل نقل حديثة ومريحة، وخدمات إرشادية على مدار الساعة.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Check className="text-accent" />
                  <span className="font-bold">تأشيرات سريعة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-accent" />
                  <span className="font-bold">فنادق مختارة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-accent" />
                  <span className="font-bold">مواصلات حديثة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-accent" />
                  <span className="font-bold">دعم فني 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-tajawal text-primary">باقات العمرة المتاحة</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {umrahPackages.map((pkg, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl border border-gray-100 shadow-lg bg-white relative overflow-hidden group"
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-accent text-white px-8 py-1 rotate-45 translate-x-6 translate-y-4 font-bold text-xs uppercase tracking-widest">
                    الأكثر طلباً
                  </div>
                )}
                <h3 className="text-xl font-extrabold mb-6 text-primary">{pkg.name}</h3>
                <div className="text-4xl font-black text-slate-900 mb-8">
                  {pkg.price} <small className="text-sm font-bold text-muted">$ / شخص</small>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Calendar size={18} className="text-primary" />
                    {pkg.nights} إقامة
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Hotel size={18} className="text-primary" />
                    {pkg.hotel}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Bus size={18} className="text-primary" />
                    {pkg.transport}
                  </li>
                </ul>

                <div className="pt-6 border-t mb-8">
                  <h4 className="font-bold text-xs text-muted mb-4 uppercase">المميزات:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Check size={14} className="text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl group-hover:bg-accent transition-all shadow-xl shadow-primary/20">
                  احجز مكانك الآن
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default UmrahPage;
