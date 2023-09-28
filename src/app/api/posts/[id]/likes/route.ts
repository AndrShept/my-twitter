import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!params.id) {
    console.log('Missing requirements fields');
    return NextResponse.json({ error: 'Missing requirements fields ' });
  }

  try {
    const findPost = await prisma.post.findUnique({
      where: { id: params.id },
      include: { likes: true },
    });
    const likeExist = findPost!.likes.some(
      (like) => like.authorId === session.user.id
    );
    const findLikeId = findPost?.likes.find(
      (like) => like.authorId === session.user.id
    );

    if (!likeExist) {
      const like = await prisma.like.create({
        data: {
          postId: params.id,
          authorId: session?.user.id,
        },
      });
      return NextResponse.json(like, { status: 201 });
    }
    if (likeExist) {
      await prisma.like.delete({
        where: { id: findLikeId?.id },
      });
      return NextResponse.json({ message: 'Like deleted' }, { status: 200 });
    }
   
  } catch (error) {
    return NextResponse.json({ error: 'Database ERROR' }, { status: 500 });
  }

};
