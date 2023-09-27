import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';




export const POST = async (req: Request) => {
  const { comment, authorName, authorImage, authorId, postId } =
    await req.json();

  try {
    const comments = await prisma.comment.create({
      data: {
        content: comment,
        authorName,
        authorImage,
        authorId,
        postId,
      },
    });
    return new NextResponse(JSON.stringify(comments), { status: 201 });
  } catch (error) {
    return new NextResponse('DATABASE ERROR', { status: 500 });
  }
};

