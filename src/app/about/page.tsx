"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="من نحن" 
        items={[{ label: 'عن الميراج' }]} 
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"
      />

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Our Team" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-accent p-8 rounded-3xl shadow-xl hidden md:block">
                <span className="text-5xl font-black text-white block mb-2">10+</span>
                <span className="text-white font-bold">سنوات من التميز</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-[2px] bg-accent"></div>
                قصة الميراج
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-8 font-tajawal text-slate-900">
                نحن هنا لنجعل من رحلة أحلامك حقيقة ملموسة
              </h3>
              <p className="text-muted leading-relaxed mb-6 text-lg">
                بدأت شركة الميراج للسفر والسياحة رحلتها منذ أكثر من عقد من الزمان برؤية واضحة: وهي الارتقاء بمفهوم السفر في المنطقة العربية من خلال تقديم خدمات سياحية متكاملة تتسم بالاحترافية والشفافية.
              </p>
              <p className="text-muted leading-relaxed mb-10 text-lg">
                اليوم، نفخر بأننا أصبحنا من رواد القطاع السياحي في المملكة، حيث نخدم آلاف العملاء سنوياً ونوفر لهم أرقى الحلول للسفر، سواء كان ذلك لغرض السياحة، العمل، أو أداء مناسك العمرة والحج.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">رؤيتنا</h4>
                    <p className="text-xs text-muted">الريادة العالمية في السياحة.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">رسالتنا</h4>
                    <p className="text-xs text-muted">إسعاد عملائنا دائماً.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-16 font-tajawal">قيمنا الجوهرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Award, title: 'الجودة والتميز', desc: 'نسعى دائماً لتقديم أعلى معايير الجودة في كل تفاصيل رحلاتنا.' },
              { icon: ShieldCheck, title: 'الصدق والأمانة', desc: 'نؤمن بالشفافية الكاملة مع عملائنا في كافة الأسعار والشروط.' },
              { icon: Users, title: 'التركيز على العميل', desc: 'رضا العميل هو المحرك الأساسي لكل ما نقوم به من تطوير.' }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 text-accent">
                  <value.icon size={40} />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-white/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-tajawal text-primary">فريق العمل</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-16"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="group">
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <Image 
                    src={`https://i.pravatar.cc/400?u=${member}`} 
                    alt="Team Member" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-900">خبير سياحي</h4>
                <p className="text-muted">مستشار سفر</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
