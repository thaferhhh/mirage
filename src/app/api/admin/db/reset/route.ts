import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Security check: Match with a secure password (can be from .env)
    const SECRET_PASSWORD = process.env.DB_RESET_PASSWORD || 'mirage2026';

    if (password !== SECRET_PASSWORD) {
      return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 403 });
    }

    // Wipe all major tables
    await prisma.blog.deleteMany({});
    await prisma.package.deleteMany({});
    await prisma.destination.deleteMany({});
    await prisma.inquiry.deleteMany({});
    await prisma.testimonial.deleteMany({});

    return NextResponse.json({ message: 'تم تصفير قاعدة البيانات بنجاح' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'فشل في تصفير قاعدة البيانات' }, { status: 500 });
  }
}
