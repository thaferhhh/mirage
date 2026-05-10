"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Hotel, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Globe,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'الرئيسية', icon: LayoutDashboard, href: '/admin' },
  { name: 'العروض والباقات', icon: Package, href: '/admin/packages' },
  { name: 'الوجهات', icon: MapPin, href: '/admin/destinations' },
  { name: 'الفنادق', icon: Hotel, href: '/admin/hotels' },
  { name: 'التأشيرات', icon: CreditCard, href: '/admin/visas' },
  { name: 'الرسائل والاستفسارات', icon: MessageSquare, href: '/admin/inquiries' },
  { name: 'المدونة', icon: FileText, href: '/admin/blog' },
  { name: 'إعدادات الموقع', icon: Settings, href: '/admin/settings' },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-slate-900">M</div>
        <div className="font-bold text-lg">لوحة التحكم</div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-primary text-white" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              pathname === item.href ? "text-white" : "group-hover:text-accent"
            )} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-white/10 space-y-4">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white transition-colors text-sm">
          <Globe size={18} />
          <span>زيارة الموقع</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300 transition-colors text-sm w-full">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
