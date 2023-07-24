import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';


export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post = await prisma.post.findUnique({
     where:{ id: params.id},
     include: {comments: true}
    });
    revalidatePath('post/' + params.id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('DATABASE-ERROR', { status: 500 });
  }
};


export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    revalidatePath('/');
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse('Database ERROR', { status: 500 });
  }
};


