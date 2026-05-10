import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const pkg = await prisma.package.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pkg) return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updatedPackage = await prisma.package.update({
      where: { id: parseInt(id) },
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
    return NextResponse.json(updatedPackage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.package.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
