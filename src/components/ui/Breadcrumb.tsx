"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbProps {
  title: string;
  items: { label: string; href?: string }[];
  backgroundImage?: string;
}

const Breadcrumb = ({ title, items, backgroundImage }: BreadcrumbProps) => {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      {/* Background with overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt={title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary"></div>
        </div>
      )}
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-tajawal">{title}</h1>
        
        <nav className="flex justify-center items-center space-x-2 space-x-reverse text-white/80">
          <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
            <Home size={16} />
            <span>الرئيسية</span>
          </Link>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronLeft size={16} className="opacity-50" />
              {item.href ? (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-accent font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
