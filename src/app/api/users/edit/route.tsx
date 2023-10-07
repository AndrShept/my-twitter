import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const body = await req.json();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  if (!body) {
    console.log('Missing requirements fields');
    return NextResponse.json({ error: 'Missing requirements fields ' });
  }

  const newUserData = await prisma.user.update({
    where: { id: userId },
    data: body,
  });
  return NextResponse.json(newUserData, { status: 200 });
};
