import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDestination = await prisma.destination.create({
      data: {
        name: body.name,
        image: body.image,
        description: body.description,
        programsCount: body.programsCount || 0,
      },
    });
    return NextResponse.json(newDestination);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
