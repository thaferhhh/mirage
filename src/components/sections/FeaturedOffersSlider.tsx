"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { featuredOffers } from '@/data/mockData';
import Image from 'next/image';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FeaturedOffersSlider = () => {
  const [offers, setOffers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/packages?category=packages&isFeatured=true');
        const data = await res.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-right">
            <h2 className="text-secondary font-black tracking-widest uppercase text-xs mb-3">عروض حصرية</h2>
            <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary">باقات مختارة لك</h3>
          </div>
          <button className="group flex items-center gap-3 text-primary font-black text-sm transition-all hover:text-accent">
            <span className="underline decoration-primary/20 group-hover:decoration-accent/50">استكشف كافة العروض</span>
            <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={18} className="rotate-180" />
            </div>
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="pb-20 !overflow-visible"
        >
          {loading ? (
            [1, 2, 3].map((i) => (
              <SwiperSlide key={i}>
                <div className="h-[500px] bg-white rounded-[40px] animate-pulse"></div>
              </SwiperSlide>
            ))
          ) : (
            offers.map((offer: any) => (
              <SwiperSlide key={offer.id}>
                <motion.div 
                  whileHover={{ y: -12 }}
                  className="bg-white rounded-[40px] overflow-hidden shadow-premium border border-slate-100 h-full flex flex-col group transition-all duration-500"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image 
                      src={offer.image} 
                      alt={offer.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    {offer.discount && (
                      <div className="absolute top-6 right-6 bg-accent text-white px-5 py-2 rounded-2xl font-black text-xs shadow-xl shadow-accent/20">
                        -{offer.discount}% خصم
                      </div>
                    )}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-primary font-black text-xs flex items-center gap-2 shadow-lg">
                      <Star size={14} className="fill-accent text-accent" />
                      5.0
                    </div>
                  </div>
                  
                  <div className="p-10 flex-1 flex flex-col text-right">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                      <MapPin size={14} className="text-secondary" />
                      <span>{offer.location}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 font-tajawal text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-8 bg-slate-50 p-3 rounded-2xl w-fit mr-auto ml-0">
                      <Clock size={16} className="text-secondary" />
                      <span>{offer.duration}</span>
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-slate-50 flex justify-between items-center flex-row-reverse">
                      <div className="text-right">
                        {offer.oldPrice && <span className="text-slate-300 text-[10px] font-bold line-through block mb-1">{offer.oldPrice} $</span>}
                        <span className="text-primary text-3xl font-black flex items-end gap-1">
                          {offer.price} 
                          <small className="text-xs font-bold text-slate-400 pb-1">$</small>
                        </span>
                      </div>
                      <Link 
                        href={`/offers/${offer.id}`}
                        className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl shadow-primary/20"
                      >
                        <ArrowRight size={24} className="rotate-180" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedOffersSlider;
