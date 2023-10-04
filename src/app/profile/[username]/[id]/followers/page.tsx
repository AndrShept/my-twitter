import { prisma } from '@/lib/db/prisma';
import React from 'react';
import { FollowersUsers } from './FollowersUsers';

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const followers = await prisma.follower.findMany({
    where: { userId: params.id },
  });
  const users = await prisma.user.findMany({
    where: { id: { in: followers.map((follower) => follower.followerId) } },
    include: { follower: true },
  });

  return (
    <section className='max-w-[300px] mx-auto'>
      <FollowersUsers followersUsers={users} />
      {!users.length && (
        <h1 className='text-muted-foreground   '>
          When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers.
        </h1>
      )}
    </section>
  );
};

export default page;
