"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hotel, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Coffee, 
  Wifi, 
  Waves, 
  Utensils,
  ChevronRight,
  Info
} from 'lucide-react';
import Image from 'next/image';

const HotelsPage = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const featuredHotels = [
    { 
      name: 'فندق برج العرب', 
      location: 'دبي، الإمارات', 
      stars: 5, 
      price: '4500', 
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      amenities: [<Wifi key="w" size={14}/>, <Waves key="wv" size={14}/>, <Utensils key="u" size={14}/>]
    },
    { 
      name: 'منتجع فيلا المالديف', 
      location: 'ماليه، المالديف', 
      stars: 5, 
      price: '3200', 
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
      amenities: [<Wifi key="w" size={14}/>, <Waves key="wv" size={14}/>, <Coffee key="c" size={14}/>]
    },
    { 
      name: 'فندق سويس أوتيل', 
      location: 'مكة المكرمة، السعودية', 
      stars: 5, 
      price: '1800', 
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      amenities: [<Wifi key="w" size={14}/>, <Utensils key="u" size={14}/>, <Info key="i" size={14}/>]
    },
    { 
      name: 'فندق شانغريلا', 
      location: 'إسطنبول، تركيا', 
      stars: 5, 
      price: '2100', 
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
      amenities: [<Wifi key="w" size={14}/>, <Coffee key="c" size={14}/>, <Waves key="wv" size={14}/>]
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <Breadcrumb 
        title="فنادق ومنتجعات فاخرة" 
        items={[{ label: 'الفنادق' }]} 
        backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Search Section */}
      <section className="relative -mt-20 pb-20 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[40px] shadow-premium p-8 md:p-12 border border-slate-100">
            <h4 className="text-xl font-black text-primary mb-8 font-tajawal">ابحث عن ملاذك المثالي</h4>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative group lg:col-span-1">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">الوجهة أو اسم الفندق</label>
                <div className="relative">
                  <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                  <input 
                    type="text" 
                    placeholder="أين تريد الذهاب؟"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">تاريخ الوصول والمناداة</label>
                <div className="relative">
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                  <input 
                    type="text" 
                    placeholder="التواريخ"
                    onFocus={(e) => e.target.type = 'date'}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest mr-4">الضيوف والغرف</label>
                <div className="relative">
                  <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                  <select className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none">
                    <option>2 بالغين، 1 غرفة</option>
                    <option>1 بالغ، 1 غرفة</option>
                    <option>عائلة (2 بالغين + أطفال)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-secondary text-white rounded-2xl py-4 font-black text-lg shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all flex items-center justify-center gap-3"
                >
                  {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={22} />}
                  بحث عن الفنادق
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-accent font-black tracking-widest uppercase text-xs mb-3">مجموعتنا المختارة</h2>
              <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary leading-tight">فنادق ومنتجعات استثنائية</h3>
            </div>
            <div className="w-20 h-1.5 bg-secondary rounded-full hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHotels.map((hotel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[40px] overflow-hidden shadow-premium border border-slate-50 hover:shadow-2xl transition-all"
              >
                <div className="relative h-64">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-black text-primary">{hotel.stars}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {hotel.amenities.map((icon, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary">
                        {icon}
                      </div>
                    ))}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 font-tajawal group-hover:text-secondary transition-colors">
                    {hotel.name}
                  </h4>
                  <p className="text-slate-400 text-xs flex items-center gap-1 mb-6">
                    <MapPin size={12} />
                    {hotel.location}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">تبدأ من</span>
                      <span className="text-xl font-black text-primary">{hotel.price} $</span>
                    </div>
                    <button className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-accent font-black tracking-widest uppercase text-xs mb-8">أنواع الإقامة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'منتجعات شاطئية', count: '120+' },
              { label: 'فنادق مدن', count: '450+' },
              { label: 'فلل خاصة', count: '85+' },
              { label: 'أجنحة فاخرة', count: '200+' },
            ].map((cat, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-3xl font-black text-accent mb-2">{cat.count}</div>
                <div className="text-sm opacity-60 font-bold">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop" alt="Hotel View" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-premium hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="font-black text-primary">تأكيد فوري</div>
                    <div className="text-xs text-slate-400">احجز واحصل على تأكيدك في ثوانٍ</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-black font-tajawal text-primary mb-8 leading-tight">لماذا تحجز فندقك مع الميراج؟</h3>
              <div className="space-y-8">
                {[
                  { title: 'أسعار حصرية', desc: 'نقدم لك أسعاراً أقل من المواقع العالمية بفضل شراكاتنا المباشرة مع الفنادق.' },
                  { title: 'إلغاء مرن', desc: 'خيارات إلغاء مجانية على معظم الغرف لضمان راحة بالك في حال تغيرت خططك.' },
                  { title: 'برنامج الولاء', desc: 'اكسب نقاطاً مع كل حجز واستبدلها بليالي مجانية أو خصومات حصرية.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-secondary font-black flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-lg mb-2 text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
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

const ShieldCheck = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default HotelsPage;
