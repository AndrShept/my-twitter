import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {likes: true, comments: true}
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database ERROR', { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const {
      content,
      image,
      authorId,
      authorName,
      authorUserName,
      authorImage,
    } = await req.json();

    await prisma.post.create({
      data: {
        content,
        image,
        authorId,
        authorName,
        authorUserName,
        authorImage,
      },
    });
  } catch (error) {
    throw new Error('error create post');
  }

  return new NextResponse('Post create success', { status: 201 });
};


