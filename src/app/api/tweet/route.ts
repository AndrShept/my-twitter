import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { content, image, authorId, authorName, authorImage } =
      await req.json();

    await prisma.post.create({
      data: { content, image, authorId, authorName, authorImage },
    });
  } catch (error) {
    throw new Error('error create post');
  }

  return new NextResponse('Post created success', { status: 201 });
};
