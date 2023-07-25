import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
    console.log(params.id)
  try {
    const comment = await prisma.comment.delete({
      where: { id: params.id },
    });
   revalidatePath('/')
    return new NextResponse('comment success delete', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('DATABASE-ERROR ', { status: 500 });
  }
};
