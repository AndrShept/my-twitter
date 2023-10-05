import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { comment, postId } = await req.json();

  if (!session) {
    console.log('Unregistered');
    return NextResponse.json({ error: 'Unregistered' }, { status: 401 });
  }
  if (!postId || !postId) {
    console.log('Missing requirements fields');
    return NextResponse.json(
      { error: 'Missing requirements fields' },
      { status: 400 }
    );
  }

  const comments = await prisma.comment.create({
    data: {
      content: comment,
      authorName: session.user.name!,
      authorImage: session.user.image!,
      authorId: session.user.id,
      postId,
    },
  });
  return new NextResponse(JSON.stringify(comments), { status: 201 });
};
