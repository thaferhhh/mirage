import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const packages = await prisma.package.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPackage = await prisma.package.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        price: parseFloat(body.price),
        oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
        discount: body.discount ? parseInt(body.discount) : null,
        duration: body.duration,
        location: body.location,
        category: body.category,
        isFeatured: body.isFeatured || false,
      },
    });
    return NextResponse.json(newPackage);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
