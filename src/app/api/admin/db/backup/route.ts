import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = {
      users: await prisma.user.findMany(),
      packages: await prisma.package.findMany(),
      destinations: await prisma.destination.findMany(),
      blogs: await prisma.blog.findMany(),
      testimonials: await prisma.testimonial.findMany(),
      inquiries: await prisma.inquiry.findMany(),
      siteSettings: await prisma.siteSetting.findMany(),
    };

    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename=mirage_backup_${new Date().toISOString().split('T')[0]}.json`,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create backup', details: error.message }, { status: 500 });
  }
}
