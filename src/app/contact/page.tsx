"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: 'حجز رحلة سياحية',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: 'حجز رحلة سياحية', message: '' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="اتصل بنا" 
        items={[{ label: 'تواصل مع الميراج' }]} 
        backgroundImage="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold mb-8 font-tajawal text-primary">معلومات التواصل</h2>
              
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-6 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">رقم الهاتف</h4>
                  <p className="text-muted" dir="ltr">+964 770 000 0000</p>
                  <p className="text-muted" dir="ltr">+964 11 000 0000</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-6 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">البريد الإلكتروني</h4>
                  <p className="text-muted">info@mirage-travel.com</p>
                  <p className="text-muted">sales@mirage-travel.com</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-6 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">موقعنا</h4>
                  <p className="text-muted">العراق، بغداد، حي المنصور، شارع 14 رمضان</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-primary text-white flex flex-col items-center text-center">
                <MessageCircle size={40} className="mb-4 text-accent" />
                <h4 className="font-bold text-xl mb-4">هل لديك استفسار سريع؟</h4>
                <p className="text-white/70 mb-6">فريقنا متاح عبر واتساب للرد على استفساراتكم فوراً.</p>
                <button className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
                  دردشة واتساب
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
                <h2 className="text-3xl font-extrabold mb-4 font-tajawal text-primary">أرسل لنا رسالة</h2>
                <p className="text-muted mb-12">سواء كنت تخطط لرحلتك القادمة أو لديك أي اقتراح، يسعدنا دائماً سماع رأيك.</p>
                
                {submitted ? (
                  <div className="bg-emerald-50 text-emerald-700 p-8 rounded-2xl text-center">
                    <h4 className="text-2xl font-bold mb-2">شكراً لتواصلك معنا!</h4>
                    <p>تم استلام رسالتك بنجاح، وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-emerald-700 font-bold underline">إرسال رسالة أخرى</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-bold text-sm text-slate-700">الاسم الكامل</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="أدخل اسمك هنا" 
                        className="w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-sm text-slate-700">البريد الإلكتروني</label>
                      <input 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="email@example.com" 
                        className="w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-sm text-slate-700">رقم الهاتف</label>
                      <input 
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel" 
                        placeholder="+964 770..." 
                        className="w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-sm text-slate-700">نوع الاستفسار</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                      >
                        <option value="حجز رحلة سياحية">حجز رحلة سياحية</option>
                        <option value="استفسار عن تأشيرة">استفسار عن تأشيرة</option>
                        <option value="خدمات العمرة">خدمات العمرة</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="font-bold text-sm text-slate-700">الرسالة</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5} 
                        placeholder="كيف يمكننا مساعدتك؟" 
                        className="w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button 
                        disabled={loading}
                        className="w-full md:w-auto bg-primary text-white font-bold py-4 px-12 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                      >
                        <span>{loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
                        {!loading && <Send size={20} className="rotate-180" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-gray-200 relative">
        {/* Placeholder for Google Map */}
        <div className="absolute inset-0 flex items-center justify-center text-muted font-bold italic">
          Google Maps API Placeholder
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
