import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  console.log(params.id);
  if (!params) {
    console.log('Missing requirements fields [GET user]');
    return NextResponse.json({
      error: 'Missing requirements fields [GET user] ',
    });
  }

  const res = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      follower: true,
      following: true,
      _count: { select: { follower: true, following: true } },
    },
  });
  return NextResponse.json(res, { status: 200 });
};
