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

  const findUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { favoritePosts: true },
  });
  const favoritePostFindId = findUser?.favoritePosts.find(
    (favoritePost) => favoritePost.postId === params.id
  );
  const favoritePostExist = findUser?.favoritePosts.some(
    (favoritePost) => favoritePost.postId === params.id
  );

  console.log(favoritePostFindId);
  if (!favoritePostExist) {
    const newFavoritePost = await prisma.favoritePost.create({
      data: { postId: params.id, userId: session.user.id },
    });
    return NextResponse.json(newFavoritePost, { status: 201 });
  }
  if (favoritePostExist) {
    await prisma.favoritePost.delete({
      where: { id: favoritePostFindId?.id },
    });
    return NextResponse.json(
      { message: 'FavoritePost delete' },
      { status: 200 }
    );
  }
};
