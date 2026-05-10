"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'من نحن', href: '/about' },
  { name: 'عروض السفر', href: '/offers', hasMega: true },
  { name: 'حجوزات الطيران', href: '/flights' },
  { name: 'الفنادق', href: '/hotels' },
  { name: 'العمرة والحج', href: '/umrah' },
  { name: 'التأشيرات', href: '/visas' },
  { name: 'الوجهات', href: '/destinations' },
  { name: 'المدونة', href: '/blog' },
  { name: 'اتصل بنا', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "w-full z-50 transition-all duration-300",
      isScrolled ? "fixed top-0 bg-white shadow-md py-2" : "relative bg-white py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="الميراج للسفر والسياحة" 
            width={150} 
            height={50} 
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-1 space-x-reverse">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                href={link.href}
                className="px-3 py-2 text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                {link.name}
                {link.hasMega && <ChevronDown size={14} className="opacity-50" />}
              </Link>
              {link.hasMega && (
                <div className="absolute top-full right-0 w-[600px] bg-white shadow-xl rounded-b-lg p-6 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-[100] border-t-2 border-primary">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-primary mb-3 border-b pb-2">عروض مميزة</h4>
                      <ul className="space-y-2">
                        <li><Link href="/offers?cat=summer" className="text-sm hover:text-secondary">عروض الصيف</Link></li>
                        <li><Link href="/offers?cat=honeymoon" className="text-sm hover:text-secondary">شهر العسل</Link></li>
                        <li><Link href="/offers?cat=family" className="text-sm hover:text-secondary">رحلات عائلية</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-3 border-b pb-2">الوجهات الشائعة</h4>
                      <ul className="space-y-2">
                        <li><Link href="/destinations" className="text-sm hover:text-secondary">تركيا</Link></li>
                        <li><Link href="/destinations" className="text-sm hover:text-secondary">دبي</Link></li>
                        <li><Link href="/destinations" className="text-sm hover:text-secondary">ماليزيا</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-3 border-b pb-2">خدمات أخرى</h4>
                      <ul className="space-y-2">
                        <li><Link href="/booking" className="text-sm hover:text-secondary">تأمين السفر</Link></li>
                        <li><Link href="/transport" className="text-sm hover:text-secondary">استئجار سيارات</Link></li>
                        <li><Link href="/visas" className="text-sm hover:text-secondary">رخص دولية</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <User size={18} />
            <span>دخول</span>
          </Link>
          <Link 
            href="/booking" 
            className="bg-accent text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20"
          >
            <Calendar size={18} />
            <span>احجز الآن</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "xl:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[80vh] py-6 border-t" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium hover:text-primary border-b border-gray-100 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-bold"
            >
              <User size={18} />
              <span>تسجيل الدخول</span>
            </Link>
            <Link 
              href="/booking" 
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold"
            >
              <Calendar size={18} />
              <span>احجز الآن</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
