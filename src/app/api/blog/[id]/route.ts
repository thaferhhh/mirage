import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    // Handling both Promise and non-Promise params for compatibility
    const params = await context.params;
    const { id } = params;
    
    const post = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
