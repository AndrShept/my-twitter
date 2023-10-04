import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    console.log('Missing requirements fields');
    return NextResponse.json({ error: 'Missing requirements fields ' });
  }
  try {
    const comment = await prisma.comment.delete({
      where: { id: params.id },
    });
    return new NextResponse('comment success delete', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('DATABASE-ERROR ', { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  if (!params.id || !body) {
    console.log('Missing requirements fields');
    return NextResponse.json({ error: 'Missing requirements fields ' });
  }
  try {
    const comment = await prisma.comment.update({
      where: { id: params.id },
      data: { content: body },
    });
    return new NextResponse(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse('DATABASE-ERROR ', { status: 500 });
  }
};
