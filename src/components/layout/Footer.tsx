"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.png" alt="Logo" width={180} height={60} className="brightness-0 invert h-12 w-auto" />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8">
              الميراج للسفر والسياحة هي شركة متخصصة في تقديم أفضل خدمات السفر والسياحة، بما في ذلك حجوزات الطيران والفنادق والتأشيرات والبرامج السياحية وخدمات العمرة والحج.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-r-4 border-accent pr-4 font-tajawal">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">من نحن</Link></li>
              <li><Link href="/offers" className="hover:text-accent transition-colors">العروض الحالية</Link></li>
              <li><Link href="/visas" className="hover:text-accent transition-colors">التأشيرات</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-r-4 border-accent pr-4 font-tajawal">خدماتنا</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/flights" className="hover:text-accent transition-colors">حجوزات الطيران</Link></li>
              <li><Link href="/hotels" className="hover:text-accent transition-colors">الفنادق والمنتجعات</Link></li>
              <li><Link href="/umrah" className="hover:text-accent transition-colors">العمرة والحج</Link></li>
              <li><Link href="/packages" className="hover:text-accent transition-colors">البرامج السياحية</Link></li>
              <li><Link href="/cars" className="hover:text-accent transition-colors">النقل والاستقبال</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-r-4 border-accent pr-4 font-tajawal">معلومات التواصل</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <MapPin size={20} />
                </div>
                <span className="text-gray-400">العراق، بغداد، حي المنصور، شارع 14 رمضان</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <Phone size={20} />
                </div>
                <span className="text-gray-400" dir="ltr">+964 770 000 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <Mail size={20} />
                </div>
                <span className="text-gray-400">info@mirage-travel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>جميع الحقوق محفوظة © 2026 الميراج للسفر والسياحة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
