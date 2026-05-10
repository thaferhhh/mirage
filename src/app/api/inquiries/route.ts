import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newInquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject || 'استفسار عام',
        message: body.message,
      },
    });
    return NextResponse.json(newInquiry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 });
  }
}
