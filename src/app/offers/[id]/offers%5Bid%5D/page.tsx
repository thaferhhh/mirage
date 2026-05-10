"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Star, Clock, MapPin, CheckCircle2, XCircle, 
  Calendar, Users, Plane, Hotel, MessageCircle,
  Share2, Heart, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PackageDetailsPage = () => {
  const params = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`/api/packages/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPkg(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-20 h-20 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
    </div>
  );

  if (!pkg) return <div className="min-h-screen flex items-center justify-center">العرض غير موجود</div>;

  return (
    <main className="min-h-screen bg-slate-50 text-right" dir="rtl">
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="container relative mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-accent text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl shadow-accent/20">
              {pkg.category === 'umrah' ? 'عمرة وحج' : 'برنامج سياحي'}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 border border-white/10">
              <Star size={14} className="fill-accent text-accent" />
              {pkg.rating} (120 تقييم)
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-tajawal leading-tight max-w-4xl">
            {pkg.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-white/80 font-bold">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-secondary" />
              <span>{pkg.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-secondary" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-secondary" />
              <span>متاح طوال العام</span>
            </div>
          </div>
        </div>

        {/* Floating Action Bar for Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 flex justify-between items-center shadow-2xl">
           <div>
             <p className="text-xs text-muted font-bold">السعر يبدأ من</p>
             <p className="text-primary text-xl font-black">{pkg.price} ر.س</p>
           </div>
           <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm">احجز الآن</button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content Area */}
            <div className="lg:w-2/3 space-y-12">
              
              {/* Custom Tabs */}
              <div className="flex gap-4 border-b overflow-x-auto no-scrollbar">
                {[
                  { id: 'overview', label: 'نظرة عامة' },
                  { id: 'itinerary', label: 'برنامج الرحلة' },
                  { id: 'includes', label: 'ماذا تشمل؟' },
                  { id: 'reviews', label: 'التقييمات' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-2 font-black text-sm transition-all relative whitespace-nowrap ${
                      activeTab === tab.id ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                        <p>{pkg.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         {[
                           { icon: Plane, label: 'طيران دولي' },
                           { icon: Hotel, label: 'سكن فاخر' },
                           { icon: Users, label: 'مرشد سياحي' },
                           { icon: ShieldCheck, label: 'تأمين سفر' },
                         ].map((item, i) => (
                           <div key={i} className="flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                             <item.icon size={24} className="text-secondary mb-3" />
                             <span className="text-xs font-bold text-slate-900">{item.label}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'itinerary' && (
                    <div className="space-y-8">
                      {[1, 2, 3].map((day) => (
                        <div key={day} className="flex gap-6 relative">
                          {day !== 3 && <div className="absolute top-12 bottom-0 right-6 w-[2px] bg-slate-100"></div>}
                          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black flex-shrink-0 z-10">
                            {day}
                          </div>
                          <div className="pb-12">
                            <h4 className="text-xl font-black text-slate-900 mb-3">اليوم {day}: الوصول والاستقبال</h4>
                            <p className="text-slate-600 leading-relaxed">الاستقبال من المطار والتوجه إلى الفندق لتسجيل الدخول وقضاء وقت حر للراحة. في المساء سنقوم بجولة تعريفية بسيطة في المنطقة المحيطة.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'includes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h4 className="font-black text-slate-900 flex items-center gap-2">
                          <CheckCircle2 size={20} className="text-emerald-500" />
                          تشمل الرحلة:
                        </h4>
                        <ul className="space-y-3 pr-6">
                          <li className="text-sm font-bold text-slate-600">تذاكر الطيران ذهاب وإياب</li>
                          <li className="text-sm font-bold text-slate-600">الإقامة في فنادق 5 نجوم مختارة</li>
                          <li className="text-sm font-bold text-slate-600">وجبة الإفطار يومياً</li>
                          <li className="text-sm font-bold text-slate-600">جميع التنقلات بسيارات حديثة</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-black text-slate-900 flex items-center gap-2">
                          <XCircle size={20} className="text-rose-500" />
                          لا تشمل الرحلة:
                        </h4>
                        <ul className="space-y-3 pr-6">
                          <li className="text-sm font-bold text-slate-600">رسوم التأشيرة</li>
                          <li className="text-sm font-bold text-slate-600">المصروفات الشخصية</li>
                          <li className="text-sm font-bold text-slate-600">الوجبات غير المذكورة</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Booking Form */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
                  {/* Price Tag */}
                  <div className="absolute top-0 right-0 left-0 bg-primary p-6 text-center text-white">
                    <p className="text-xs font-bold opacity-70 mb-1">السعر للشخص يبدأ من</p>
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-4xl font-black">{pkg.price}</span>
                      <span className="text-sm font-bold text-accent pb-1">ر.س</span>
                    </div>
                    {pkg.oldPrice && <span className="text-xs line-through opacity-40 mt-1 block">{pkg.oldPrice} ر.س</span>}
                  </div>

                  <form className="mt-28 space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">تاريخ الرحلة</label>
                      <input type="date" className="w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">عدد المسافرين</label>
                      <select className="w-full p-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                        <option>1 مسافر</option>
                        <option>2 مسافر</option>
                        <option>3 مسافرين</option>
                        <option>عائلة (4+)</option>
                      </select>
                    </div>
                    
                    <button className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 mt-8">
                      احجز مكانك الآن
                    </button>
                    
                    <button className="w-full bg-white text-primary border-2 border-primary/10 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                      <MessageCircle size={20} className="text-secondary" />
                      استفسار عبر واتساب
                    </button>
                  </form>
                  
                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-6 text-slate-300">
                    <button className="hover:text-rose-500 transition-colors flex items-center gap-2">
                      <Heart size={18} />
                      <span className="text-xs font-bold">تفضيل</span>
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center gap-2">
                      <Share2 size={18} />
                      <span className="text-xs font-bold">مشاركة</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-[40px] text-center">
                   <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <ShieldCheck size={32} />
                   </div>
                   <h4 className="text-xl font-black mb-4 font-tajawal text-accent">لماذا تحجز مع الميراج؟</h4>
                   <ul className="text-xs text-white/60 space-y-3 text-right">
                     <li className="flex items-center gap-2">
                       <CheckCircle2 size={14} className="text-secondary" />
                       أسعار تنافسية وحصرية
                     </li>
                     <li className="flex items-center gap-2">
                       <CheckCircle2 size={14} className="text-secondary" />
                       تأكيد فوري للحجز
                     </li>
                     <li className="flex items-center gap-2">
                       <CheckCircle2 size={14} className="text-secondary" />
                       دعم فني على مدار الساعة
                     </li>
                   </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PackageDetailsPage;
