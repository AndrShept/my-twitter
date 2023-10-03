import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const body = await req.json();
  const {
    followingId,
    followingUserName,
    followingImage,
    followingName,
  }: {
    followingId: string;
    followingUserName: string;
    followingImage: string;
    followingName: string;
  } = body;

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  if (!followingId || !followingUserName || !followingImage || !followingName) {
    console.log('Missing requirements fields');
    return NextResponse.json({ error: 'Missing requirements fields ' });
  }

  const userFollowing = await prisma.user.findUnique({
    include: { following: true},
    where: { id: userId },
  });
  const userFollower = await prisma.user.findUnique({
    include: { follower:true},
    where: { id: followingId },
  });

  const followingExist = userFollowing?.following.some(
    (follow) => follow.followingId === followingId
  );
  const findFollowingId = userFollowing?.following.find(
    (follow) => follow.followingId === followingId
  );
  const findFollowerId = userFollower?.follower.find(
    (follow) => follow.followerId === followingId
  );

  if (!followingExist) {
    const newFollowing = await prisma.following.create({
      data: {
        followingId,
        followingUserName,
        followingName,
        followingImage,
        userId,
      },
    });
    const newFollower = await prisma.follower.create({
      data: {followerId: userId, userId: followingId }
    })
    return NextResponse.json(newFollowing, { status: 201 });
  } else {
    await prisma.following.delete({
      where: { id: findFollowingId?.id },
    });
    await prisma.follower.deleteMany({
      where: { id: findFollowerId?.id },
    });
    return NextResponse.json({ message: 'following deleted' }, { status: 200 });
  }
};
