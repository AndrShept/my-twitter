import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const authorId = await req.json();

    const like = await prisma.like.create({
      data: {
        postId: params.id,
        authorId,
      },
    });
    revalidatePath('/');
    return new NextResponse(JSON.stringify(like), { status: 201 });
  } catch (error) {
    return new NextResponse('Database ERROR', { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const authorId = await req.json();

    const like = await prisma.like.deleteMany({
      where: { postId: params.id, authorId },
    });
    revalidatePath('/');
    return new NextResponse(JSON.stringify(like), { status: 201 });
  } catch (error) {
    return new NextResponse('Database ERROR', { status: 500 });
  }
};
