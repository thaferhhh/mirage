"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Star,
  ChevronRight,
  PhoneCall,
  Navigation
} from 'lucide-react';
import Image from 'next/image';

const TransportPage = () => {
  const services = [
    {
      title: 'استقبال المطار',
      desc: 'خدمة استقبال احترافية مع لوحة تحمل اسمك وسائق يتحدث العربية والإنجليزية.',
      icon: <UserCheck size={32} />,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'تأجير سيارات خاصة',
      desc: 'أحدث الموديلات من السيارات الاقتصادية إلى الفارهة مع سائق أو بدون.',
      icon: <Car size={32} />,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'تنقلات المدن',
      desc: 'خدمة التنقل بين المدن بكل راحة وأمان مع أسطول حديث ومجهز.',
      icon: <Navigation size={32} />,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <main className="min-h-screen bg-white text-right" dir="rtl">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="النقل والاستقبال" 
        items={[{ label: 'خدمات النقل' }]} 
        backgroundImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-accent font-black tracking-widest uppercase text-xs mb-4">راحتك تبدأ من المطار</h2>
              <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary mb-8 leading-tight">خدمات نقل فاخرة وآمنة في كل وجهاتنا</h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                في الميراج، ندرك أن تجربة السفر تبدأ من اللحظة التي تطأ فيها قدماك أرض الوجهة. لذلك، نقدم لك أسطولاً من السيارات الحديثة وسائقين محترفين يضمنون لك وصولاً آمناً ومريحاً إلى فندقك أو وجهتك.
              </p>
              <div className="space-y-6">
                {[
                  'سائقون محترفون يتحدثون لغتك',
                  'سيارات حديثة ومكيفة بالكامل',
                  'دعم ومتابعة على مدار 24 ساعة',
                  'أسعار ثابتة بدون رسوم خفية'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop" alt="Luxury Transport" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[32px] shadow-premium hidden md:block">
                <div className="text-center">
                  <div className="text-4xl font-black text-primary mb-2">100%</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">أمان وخصوصية</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black font-tajawal text-primary mb-6">مجموعة خدماتنا المتميزة</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] overflow-hidden shadow-premium border border-white hover:border-secondary/20 transition-all"
            >
              <div className="relative h-64">
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-10">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 font-tajawal">{service.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{service.desc}</p>
                <button className="flex items-center gap-2 text-primary font-black text-sm group-hover:text-secondary transition-colors">
                  <span>اطلب الخدمة الآن</span>
                  <ChevronRight size={18} className="rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-tajawal">احجز وسيلة نقلك مسبقاً</h2>
              <p className="text-white/60 mb-10 max-w-xl mx-auto">تجنب زحام المطارات وانتظار سيارات الأجرة. احجز وسيلة نقلك الآن واستمتع براحة البال منذ اللحظة الأولى.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-secondary text-white font-black px-12 py-5 rounded-2xl hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/30">
                  احجز الآن
                </button>
                <button className="bg-white/10 text-white font-black px-12 py-5 rounded-2xl hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-3">
                  <PhoneCall size={20} />
                  <span>تحدث مع خبير</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TransportPage;
