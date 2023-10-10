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

  await prisma.post.updateMany({
    where: { authorId: session.user.id },
    data: { authorImage: newUserData.image || '' },
  });
  await prisma.comment.updateMany({
    where: { authorId: session.user.id },
    data: { authorImage: newUserData.image || '' },
  });
  return NextResponse.json(newUserData, { status: 200 });
};

// export const UPDATE = async (req: Request) => {
//   const session = await getServerSession(authOptions);
//   const userId = session?.user.id;
//   const body = await req.json();
//   console.log(body)
//   console.log(userId)

//   if (!userId) {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }
//   if (!body) {
//     console.log('Missing requirements fields');
//     return NextResponse.json({ error: 'Missing requirements fields ' });
//   }

//   const newBoolean = prisma.user.update({
//     where: { id: userId },
//     data: { isBirthdayShow: body },
//   });
//   return NextResponse.json(newBoolean, { status: 200 });
// };
