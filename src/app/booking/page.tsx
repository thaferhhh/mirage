"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck,
  User,
  MessageSquare,
  Globe,
  Plane,
  Hotel
} from 'lucide-react';

const BookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'طلب حجز جديد',
    message: '',
    service: 'package' // flight, hotel, package, visa
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.subject} - ${formData.service}`,
          message: formData.message || `طلب حجز خدمة: ${formData.service}`
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('حدث خطأ أثناء إرسال الطلب');
      }
    } catch (error) {
      console.error(error);
      alert('فشل الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-right" dir="rtl">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="احجز رحلتك الآن" 
        items={[{ label: 'طلب حجز' }]} 
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Booking Form */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-[40px] shadow-premium p-8 md:p-12 border border-slate-100"
                    >
                      <div className="mb-10">
                        <h2 className="text-3xl font-black text-primary mb-4 font-tajawal">استمارة الحجز الذكية</h2>
                        <p className="text-slate-500">قم بتعبئة بياناتك وسيقوم مستشار السفر بالتواصل معك خلال أقل من 30 دقيقة.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 mr-2">الاسم الكامل</label>
                            <div className="relative">
                              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                              <input 
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text" 
                                placeholder="أدخل اسمك بالكامل"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 mr-2">رقم الجوال</label>
                            <div className="relative">
                              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                              <input 
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel" 
                                placeholder="+964"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none text-left"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-slate-700 mr-2">البريد الإلكتروني</label>
                          <div className="relative">
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input 
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email" 
                              placeholder="example@mail.com"
                              className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-slate-700 mr-2">نوع الخدمة المطلوبة</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { id: 'package', label: 'برنامج سياحي', icon: <Globe size={18} /> },
                              { id: 'flight', label: 'تذكرة طيران', icon: <Plane size={18} /> },
                              { id: 'hotel', label: 'حجز فندق', icon: <Hotel size={18} /> },
                              { id: 'visa', label: 'تأشيرة سفر', icon: <ShieldCheck size={18} /> },
                            ].map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, service: service.id })}
                                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                                  formData.service === service.id 
                                  ? 'border-secondary bg-secondary/5 text-secondary shadow-lg shadow-secondary/10' 
                                  : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                                }`}
                              >
                                {service.icon}
                                <span className="text-[10px] font-black">{service.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-slate-700 mr-2">تفاصيل إضافية</label>
                          <div className="relative">
                            <MessageSquare className="absolute right-4 top-6 text-secondary" size={18} />
                            <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={5}
                              placeholder="اذكر الوجهة، التاريخ، أو أي ملاحظات أخرى..."
                              className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none"
                            ></textarea>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
                        >
                          {loading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <span>إرسال طلب الحجز</span>
                              <Send size={22} className="rotate-180" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[40px] shadow-premium p-12 md:p-20 border border-slate-100 text-center"
                    >
                      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-4xl font-black text-primary mb-6 font-tajawal">تم إرسال طلبك بنجاح!</h2>
                      <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        شكراً لثقتك في الميراج. لقد استلمنا طلبك وسيقوم فريق الخبراء لدينا بمراجعته والتواصل معك خلال دقائق لتأكيد الحجز.
                      </p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-secondary transition-all"
                      >
                        إرسال طلب آخر
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <div className="bg-primary text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className="text-2xl font-black mb-8 relative z-10">لماذا تحجز معنا؟</h3>
                  <div className="space-y-6 relative z-10">
                    {[
                      { icon: <Clock size={20} />, title: 'سرعة الاستجابة', desc: 'نرد على جميع الاستفسارات خلال أقل من 30 دقيقة.' },
                      { icon: <ShieldCheck size={20} />, title: 'ضمان أفضل سعر', desc: 'نضمن لك الحصول على أقل سعر متاح في السوق.' },
                      { icon: <MapPin size={20} />, title: 'خبرة عالمية', desc: 'نغطي أكثر من 50 وجهة حول العالم.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-accent mt-1">{item.icon}</div>
                        <div>
                          <div className="font-black text-sm mb-1">{item.title}</div>
                          <div className="text-xs text-white/60 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-black text-primary mb-6">اتصل بنا مباشرة</h3>
                  <div className="space-y-6">
                    <a href="tel:+9647700000000" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">الرقم الموحد</div>
                        <div className="font-black text-slate-900" dir="ltr">+964 770 000 0000</div>
                      </div>
                    </a>
                    <a href="mailto:info@mirage-travel.com" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">البريد الإلكتروني</div>
                        <div className="font-black text-slate-900">info@mirage-travel.com</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BookingPage;
