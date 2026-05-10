"use client";

import React from 'react';
import { Plane, Hotel, Map, Ship, CreditCard, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'حجوزات الطيران',
    description: 'رحلات طيران إلى أكثر من 120 وجهة عالمية بأفضل الأسعار.',
    icon: Plane,
    color: 'bg-blue-50 text-blue-600',
    href: '/flights'
  },
  {
    title: 'حجوزات الفنادق',
    description: 'أكثر من 5000 فندق ومنتجع حول العالم بخصومات حصرية.',
    icon: Hotel,
    color: 'bg-cyan-50 text-cyan-600',
    href: '/hotels'
  },
  {
    title: 'التأشيرات',
    description: 'استخراج تأشيرات الشنغن، بريطانيا، أمريكا، وغيرها بسهولة.',
    icon: CreditCard,
    color: 'bg-amber-50 text-amber-600',
    href: '/visas'
  },
  {
    title: 'برامج سياحية',
    description: 'برامج سياحية متكاملة تشمل الطيران والفنادق والجولات.',
    icon: Map,
    color: 'bg-emerald-50 text-emerald-600',
    href: '/offers'
  },
  {
    title: 'العمرة والحج',
    description: 'خدمات العمرة والحج ببرامج متنوعة تناسب احتياجاتكم.',
    icon: Ship,
    color: 'bg-indigo-50 text-indigo-600',
    href: '/umrah'
  },
  {
    title: 'النقل والاستقبال',
    description: 'خدمات الاستقبال من المطار وتأجير السيارات الفاخرة.',
    icon: Car,
    color: 'bg-rose-50 text-rose-600',
    href: '/transport'
  },
];

import Link from 'next/link';

const ServicesGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-tajawal text-primary">خدماتنا المتميزة</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted max-w-2xl mx-auto">نقدم مجموعة متكاملة من الخدمات السياحية لضمان رحلة ممتعة وآمنة لعملائنا.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group bg-white"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted leading-relaxed mb-6">{service.description}</p>
              <Link 
                href={service.href}
                className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                اقرأ المزيد
                <span className="text-lg">←</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
