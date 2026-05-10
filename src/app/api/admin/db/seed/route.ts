import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Clear existing data to avoid duplicates (Optional, but safer for a "Full Seed")
    await prisma.blog.deleteMany({});
    await prisma.package.deleteMany({});
    await prisma.destination.deleteMany({});

    // 2. Seed Destinations
    const destinations = [
      { name: 'المالديف', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop', programsCount: 12, description: 'جنة المحيط الهندي.' },
      { name: 'تركيا', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop', programsCount: 25, description: 'ملتقى القارات.' },
      { name: 'إيطاليا', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1200&auto=format&fit=crop', programsCount: 18, description: 'بلد الفن والجمال.' },
      { name: 'دبي', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', programsCount: 20, description: 'عاصمة المستقبل.' },
    ];

    for (const dest of destinations) {
      await prisma.destination.create({ data: dest });
    }

    // 3. Seed Blog Posts
    const blogPosts = [
      { 
        title: 'أسرار السفر إلى المالديف', 
        content: 'دليل شامل لاختيار الجزيرة المثالية في المالديف وكيفية توفير ميزانية السفر.', 
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
        author: 'مستشار الميراج',
        tags: 'المالديف, نصائح'
      },
      { 
        title: 'أفضل المدن الأوروبية لعام 2026', 
        content: 'اكتشف وجهات جديدة ومثيرة في أوروبا بعيداً عن الزحام المعتاد.', 
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop',
        author: 'فريق التحرير',
        tags: 'أوروبا, سياحة'
      },
    ];

    for (const post of blogPosts) {
      await prisma.blog.create({ data: post });
    }

    // 4. Seed Packages & Visas
    const packages = [
      {
        title: 'باقة المالديف الملكية',
        description: 'إقامة فاخرة لمدة 6 أيام في فيلا عائمة فوق الماء مع وجبات فطور وعشاء شاملة.',
        image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1200&auto=format&fit=crop',
        price: 15500,
        oldPrice: 18000,
        discount: 15,
        duration: '6 أيام',
        location: 'المالديف',
        category: 'packages',
        isFeatured: true
      },
      {
        title: 'سحر إسطنبول وصبنجة',
        description: 'رحلة سياحية متكاملة تشمل زيارة المعالم التاريخية في إسطنبول وجمال الطبيعة في صبنجة.',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop',
        price: 3200,
        duration: '7 أيام',
        location: 'تركيا',
        category: 'packages',
        isFeatured: true
      },
      {
        title: 'تأشيرة شنجن السياحية',
        description: 'تجهيز ملف تأشيرة شنجن بالكامل، حجز الموعد، وتأمين السفر المعتمد.',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop',
        price: 850,
        duration: '10-15 يوم',
        location: 'أوروبا',
        category: 'visas',
        isFeatured: false
      },
      {
        title: 'تأشيرة بريطانيا',
        description: 'استخراج التأشيرة البريطانية للسياح، تشمل مراجعة المستندات والتقديم الإلكتروني.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
        price: 1100,
        duration: '15 يوم عمل',
        location: 'لندن',
        category: 'visas',
        isFeatured: false
      }
    ];

    for (const pkg of packages) {
      await prisma.package.create({ data: pkg });
    }

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      details: error.message 
    }, { status: 500 });
  }
}
