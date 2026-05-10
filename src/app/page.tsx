"use client";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedOffersSlider from "@/components/sections/FeaturedOffersSlider";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import Footer from "@/components/layout/Footer";
import { MessageCircle, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Navbar />
      <Hero />
      <ServicesGrid />
      <FeaturedOffersSlider />
      
      {/* Why Choose Us Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 font-tajawal">لماذا تختار الميراج للسفر والسياحة؟</h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                نحن لسنا مجرد وكالة سفر، بل شركاؤك في صنع ذكريات لا تُنسى. نتميز بتقديم خدمات متكاملة تلبي كافة تطلعاتك.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'خبرة 10+ سنوات', desc: 'سنوات من العطاء والتميز في السوق.' },
                  { title: 'دعم 24/7', desc: 'فريق عمل متواجد لخدمتكم دائماً.' },
                  { title: 'أسعار تنافسية', desc: 'نضمن لك أفضل الأسعار والخدمات.' },
                  { title: 'حجوزات آمنة', desc: 'نظام حجز مشفر وآمن بالكامل.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-accent font-bold text-xl">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                  <span className="text-4xl font-black text-accent mb-2">50K+</span>
                  <span className="text-sm opacity-60">عميل سعيد</span>
                </div>
                <div className="h-64 bg-secondary/20 rounded-2xl flex flex-col items-center justify-center border border-secondary/30">
                  <span className="text-4xl font-black text-white mb-2">120+</span>
                  <span className="text-sm opacity-60">وجهة عالمية</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 bg-accent/20 rounded-2xl flex flex-col items-center justify-center border border-accent/30">
                  <span className="text-4xl font-black text-white mb-2">5K+</span>
                  <span className="text-sm opacity-60">برنامج سياحي</span>
                </div>
                <div className="h-48 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                  <span className="text-4xl font-black text-accent mb-2">98%</span>
                  <span className="text-sm opacity-60">نسبة رضا العملاء</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DestinationsGrid />

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-secondary rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-secondary/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 font-tajawal">هل أنت جاهز لمغامرتك القادمة؟</h2>
              <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                اتصل بنا الآن واحصل على استشارة سياحية مجانية لتخطيط رحلة أحلامك بأفضل الأسعار.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-white text-secondary hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg transition-all shadow-xl">
                  تواصل معنا
                </button>
                <button className="bg-accent text-white hover:bg-opacity-90 font-bold py-4 px-10 rounded-full text-lg transition-all shadow-xl flex items-center justify-center gap-2">
                  <MessageCircle size={24} />
                  واتساب
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all"
            >
              <ChevronUp size={28} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <Link 
          href="https://wa.me/9647700000000" 
          target="_blank"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all relative group"
        >
          <MessageCircle size={30} />
          <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            تواصل معنا الآن
          </span>
        </Link>
      </div>
    </main>
  );
}
