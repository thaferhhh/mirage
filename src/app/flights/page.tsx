"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  PlaneTakeoff,
  PlaneLanding
} from 'lucide-react';
import Image from 'next/image';

const FlightsPage = () => {
  const [tripType, setTripType] = useState('round'); // round, one, multi
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const tripTypes = [
    { id: 'round', label: 'ذهاب وعودة', icon: <ArrowRightLeft size={16} /> },
    { id: 'one', label: 'ذهاب فقط', icon: <PlaneTakeoff size={16} /> },
    { id: 'multi', label: 'وجهات متعددة', icon: <MapPin size={16} /> },
  ];

  const popularRoutes = [
    { from: 'الرياض', to: 'دبي', price: '850', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop' },
    { from: 'جدة', to: 'إسطنبول', price: '1200', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop' },
    { from: 'الدمام', to: 'القاهرة', price: '1100', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=600&auto=format&fit=crop' },
    { from: 'الرياض', to: 'لندن', price: '2400', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="حجوزات الطيران" 
        items={[{ label: 'الطيران' }]} 
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109c055?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Search Section */}
      <section className="relative -mt-20 pb-20 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[40px] shadow-premium p-8 md:p-12 border border-slate-100">
            {/* Trip Type Tabs */}
            <div className="flex flex-wrap gap-4 mb-10 p-2 bg-slate-50 rounded-3xl w-fit">
              {tripTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTripType(type.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${
                    tripType === type.id 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30' 
                    : 'text-slate-400 hover:text-primary'
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">من (المدينة أو المطار)</label>
                <div className="relative">
                  <PlaneTakeoff className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="مدينة الإقلاع"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">إلى (الوجهة)</label>
                <div className="relative">
                  <PlaneLanding className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="وجهة الوصول"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="اختر التاريخ"
                    onFocus={(e) => e.target.type = 'date'}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">المسافرون والدرجة</label>
                <div className="relative">
                  <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
                  <select className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none">
                    <option>1 مسافر، اقتصادية</option>
                    <option>2 مسافر، اقتصادية</option>
                    <option>1 مسافر، درجة أعمال</option>
                    <option>درجة أولى</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-4 mt-4">
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-primary text-white rounded-2xl py-5 font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <AnimatePresence mode="wait">
                    {isSearching ? (
                      <motion.div
                        key="searching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        جاري البحث عن أفضل الرحلات...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="search"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Search size={24} />
                        بحث عن الرحلات المتاحة
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-accent font-black tracking-[0.2em] uppercase text-sm mb-4">أفضل العروض</h2>
            <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary mb-6">الوجهات الأكثر طلباً</h3>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularRoutes.map((route, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[32px] overflow-hidden shadow-premium border border-white hover:shadow-2xl transition-all"
              >
                <div className="relative h-48">
                  <Image src={route.image} alt={route.to} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 text-white">
                    <span className="text-xs opacity-80 block">ابتداءً من</span>
                    <span className="text-xl font-black">{route.price} $</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-slate-800">{route.from}</span>
                    <ArrowRightLeft size={16} className="text-secondary" />
                    <span className="text-lg font-bold text-slate-800">{route.to}</span>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-slate-50 text-primary font-black text-xs hover:bg-secondary hover:text-white transition-all uppercase tracking-widest">
                    احجز الآن
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <TrendingUp className="text-accent" size={40} />, title: 'أفضل الأسعار', desc: 'نضمن لك الحصول على أقل سعر متاح في السوق من خلال أنظمة الربط المباشر.' },
              { icon: <ShieldCheck className="text-secondary" size={40} />, title: 'حجز آمن', desc: 'معلوماتك وبياناتك الشخصية محمية بأعلى معايير الأمان العالمية.' },
              { icon: <Clock className="text-primary" size={40} />, title: 'دعم 24/7', desc: 'فريق خدمة العملاء متواجد لمساعدتك في أي وقت وأي مكان في العالم.' },
            ].map((benefit, i) => (
              <div key={i} className="text-center p-8 rounded-[40px] bg-white border border-slate-50 hover:border-secondary/20 transition-all shadow-sm hover:shadow-xl group">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-black mb-4 text-slate-900">{benefit.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-tajawal">احصل على عروض حصرية على بريدك</h2>
              <p className="text-white/70 mb-10 max-w-xl mx-auto">سجل معنا الآن لتصلك أحدث العروض والخصومات الخاصة برحلات الطيران قبل الجميع.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all text-white placeholder:text-white/40"
                />
                <button className="bg-accent text-white font-black px-10 py-4 rounded-2xl hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
                  اشترك الآن
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

export default FlightsPage;
