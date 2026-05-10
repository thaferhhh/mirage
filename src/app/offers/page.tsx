"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { featuredOffers } from '@/data/mockData';
import Image from 'next/image';
import { Star, Clock, MapPin, Search, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import Link from 'next/link';

const OffersPage = () => {
  const [filterType, setFilterType] = useState('all');

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="عروض السفر" 
        items={[{ label: 'كافة العروض' }]} 
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 sticky top-24">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                  <SlidersHorizontal size={20} className="text-secondary" />
                  <h3 className="font-black text-lg">تصفية النتائج</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-black mb-4 text-xs text-slate-400 uppercase tracking-widest">بحث عن وجهة</h4>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="أين تريد الذهاب؟" 
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black mb-4 text-xs text-slate-400 uppercase tracking-widest">نوع الرحلة</h4>
                    <div className="space-y-4">
                      {['الكل', 'عروض صيفية', 'شهر عسل', 'رحلات عائلية', 'عمرة وحج'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary" />
                          <span className="text-slate-600 font-bold group-hover:text-primary transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black mb-4 text-xs text-slate-400 uppercase tracking-widest">نطاق السعر</h4>
                    <input type="range" className="w-full accent-primary" />
                    <div className="flex justify-between text-[10px] font-black text-slate-400 mt-2">
                      <span>0 $</span>
                      <span>15,000 $</span>
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/20">
                    تطبيق الفلاتر
                  </button>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="w-full lg:w-3/4">
              {/* Toolbar */}
              <div className="bg-white rounded-[24px] p-6 mb-8 shadow-sm border border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="text-slate-500 font-bold">
                  تم العثور على <span className="text-primary font-black">{featuredOffers.length}</span> عرض مميز
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">ترتيب حسب:</span>
                  <select className="bg-slate-50 border-none rounded-xl text-sm font-black py-3 px-6 outline-none cursor-pointer text-primary">
                    <option>الأكثر رواجاً</option>
                    <option>السعر: من الأقل للأعلى</option>
                    <option>السعر: من الأعلى للأقل</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredOffers.map((offer, index) => (
                  <motion.div 
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                  >
                    <Link href={`/offers/${offer.id}`} className="block relative h-72 overflow-hidden">
                      <Image src={offer.image} alt={offer.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-6 right-6 bg-accent text-white px-5 py-2 rounded-2xl font-black text-[10px] shadow-xl">
                        -{offer.discount}% خصم
                      </div>
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-primary font-black text-xs flex items-center gap-2 shadow-lg">
                        <Star size={14} className="fill-accent text-accent" />
                        {offer.rating}
                      </div>
                    </Link>

                    <div className="p-10">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <MapPin size={14} className="text-secondary" />
                        <span>{offer.location}</span>
                      </div>
                      <Link href={`/offers/${offer.id}`}>
                        <h3 className="text-2xl font-black mb-4 font-tajawal group-hover:text-primary transition-colors leading-snug">{offer.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-8 bg-slate-50 p-3 rounded-2xl w-fit">
                        <Clock size={16} className="text-secondary" />
                        <span>{offer.duration}</span>
                      </div>
                      
                      <div className="pt-8 border-t border-slate-50 flex justify-between items-center flex-row-reverse">
                        <div className="text-right">
                          <p className="text-slate-300 text-[10px] font-bold line-through mb-1">{offer.oldPrice} $</p>
                          <p className="text-primary text-3xl font-black">{offer.price} <small className="text-xs font-bold text-slate-400">$</small></p>
                        </div>
                        <Link 
                          href={`/offers/${offer.id}`}
                          className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-primary/20 hover:bg-primary"
                        >
                          <ArrowRight size={24} className="rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex justify-center gap-2">
                {[1, 2, 3, '...'].map((p, i) => (
                  <button 
                    key={i}
                    className={cn(
                      "w-12 h-12 rounded-xl font-bold transition-all",
                      p === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-muted hover:bg-gray-100 border"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OffersPage;
