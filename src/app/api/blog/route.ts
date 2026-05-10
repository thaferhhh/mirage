import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        author: body.author || 'الميراج للسفر',
        tags: body.tags || 'نصائح سفر',
      },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
