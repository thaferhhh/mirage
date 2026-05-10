"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DestinationsGrid = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        setItems(data.slice(0, 8)); // Show top 8 on homepage
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-accent font-black tracking-[0.2em] uppercase text-sm mb-4">الوجهات العالمية</h2>
          <h3 className="text-4xl md:text-5xl font-black font-tajawal text-primary mb-6">اكتشف أجمل الوجهات</h3>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[450px] bg-slate-50 rounded-[32px] animate-pulse"></div>
            ))
          ) : (
            items.map((dest: any, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] rounded-[32px] overflow-hidden shadow-premium cursor-pointer transition-all duration-500 hover:-translate-y-2"
              >
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-right">
                  <h4 className="text-2xl font-black text-white mb-2 font-tajawal group-hover:text-accent transition-colors">
                    {dest.name}
                  </h4>
                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                    <span className="text-accent">{dest.programsCount}</span>
                    <span>برنامج متاح</span>
                  </div>
                  
                  {/* View Details Button (Hidden until hover) */}
                  <div className="mt-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                       عرض التفاصيل
                       <div className="w-8 h-[2px] bg-accent"></div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;
