"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Globe, Compass } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="اكتشف وجهاتنا الساحرة" 
        items={[{ label: 'الوجهات' }]} 
        backgroundImage="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black mb-6 tracking-widest uppercase"
            >
              <Compass size={14} />
              خارطة العالم بين يديك
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black font-tajawal text-primary mb-6">أين ستكون مغامرتك القادمة؟</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">اكتشف أجمل بقاع الأرض من خلال مجموعتنا المختارة من الوجهات السياحية حول العالم، حيث تجتمع الرفاهية مع التجربة الأصيلة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[450px] bg-white rounded-[40px] animate-pulse border border-slate-100 shadow-sm"></div>
              ))
            ) : destinations.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-400 font-bold">لا توجد وجهات مضافة حالياً.</p>
              </div>
            ) : (
              destinations.map((dest: any, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-premium"
                >
                  <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 text-accent mb-4">
                      <div className="w-8 h-[2px] bg-accent group-hover:w-12 transition-all"></div>
                      <span className="text-xs font-black uppercase tracking-widest">{dest.programsCount} برنامج سياحي</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 font-tajawal">{dest.name}</h3>
                    <p className="text-white/60 text-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {dest.description || 'استكشف جمال هذه الوجهة الرائعة واستمتع بأفضل العروض والبرامج السياحية المخصصة لك.'}
                    </p>
                    <Link 
                      href={`/offers?destination=${dest.name}`}
                      className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-black text-xs hover:bg-accent hover:text-white transition-all shadow-xl"
                    >
                      <span>استكشف العروض</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* World Map Background Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1920&auto=format&fit=crop" alt="Map" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Globe className="text-accent mx-auto mb-8 animate-pulse" size={64} />
          <h2 className="text-3xl md:text-5xl font-black font-tajawal mb-8">شبكة الميراج تغطي العالم</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed text-lg">نحن فخورون بتقديم خدماتنا في أكثر من 50 دولة حول العالم، مع شركاء محليين يضمنون لك أفضل تجربة ممكنة.</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-20">
            {[
              { label: 'دولة وجهة', val: '50+' },
              { label: 'شريك محلي', val: '120+' },
              { label: 'عميل سعيد', val: '15k+' },
              { label: 'برنامج فريد', val: '800+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-5xl font-black text-white mb-2">{stat.val}</div>
                <div className="text-accent font-bold text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DestinationsPage;
