"use client";

import React from 'react';
import { Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full bg-primary text-white py-2 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-secondary" />
            <span>+964 770 000 0000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-secondary" />
            <span>info@mirage-travel.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-secondary" />
            <span>9:00 AM - 9:00 PM</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center gap-3 ml-4">
            <Link href="#" className="hover:text-secondary transition-colors"><Facebook size={16} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><Instagram size={16} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><Twitter size={16} /></Link>
          </div>
          <div className="h-4 w-[1px] bg-white/20 mx-2"></div>
          <Link 
            href="https://wa.me/9647700000000" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-colors"
          >
            <MessageCircle size={14} />
            <span>واتساب</span>
          </Link>
          <select className="bg-transparent border-none outline-none cursor-pointer text-sm">
            <option value="ar" className="text-black">العربية</option>
            <option value="en" className="text-black">English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
