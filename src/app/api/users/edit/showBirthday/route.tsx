import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const body = await req.json();


  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const newBoolean = await prisma.user.update({
    where: { id: userId },
    data: { isBirthdayShow: Boolean(!body) },
  });
  return NextResponse.json({ newBoolean }, { status: 200 });
};
