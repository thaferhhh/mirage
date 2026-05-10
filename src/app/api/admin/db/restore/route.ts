import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Clear current database
    await prisma.inquiry.deleteMany({});
    await prisma.testimonial.deleteMany({});
    await prisma.blog.deleteMany({});
    await prisma.package.deleteMany({});
    await prisma.destination.deleteMany({});
    await prisma.siteSetting.deleteMany({});
    // We don't delete users to avoid locking ourselves out, or we handle them carefully

    // 2. Restore data
    if (data.destinations) {
      for (const item of data.destinations) {
        const { id, ...rest } = item;
        await prisma.destination.create({ data: rest });
      }
    }

    if (data.blogs) {
      for (const item of data.blogs) {
        const { id, ...rest } = item;
        await prisma.blog.create({ data: rest });
      }
    }

    if (data.packages) {
      for (const item of data.packages) {
        const { id, ...rest } = item;
        await prisma.package.create({ data: rest });
      }
    }

    if (data.testimonials) {
      for (const item of data.testimonials) {
        const { id, ...rest } = item;
        await prisma.testimonial.create({ data: rest });
      }
    }

    if (data.inquiries) {
      for (const item of data.inquiries) {
        const { id, ...rest } = item;
        await prisma.inquiry.create({ data: rest });
      }
    }

    return NextResponse.json({ message: 'Database restored successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to restore database', details: error.message }, { status: 500 });
  }
}
