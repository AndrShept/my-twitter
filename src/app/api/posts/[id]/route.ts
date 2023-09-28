import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { comments: true, likes: true },
    });
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
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse('Database ERROR', { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json(
      { error: 'Missing requires fields' },
      { status: 401 }
    );
  }
  const res = await prisma.post.update({
    where: { id: params.id },
    data: { view: { increment: 1 } },
  });
  return NextResponse.json(res, { status: 200 });
};
