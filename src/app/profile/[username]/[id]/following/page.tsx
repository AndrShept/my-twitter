import { UsersList } from '@/components/UsersWidget';
import { prisma } from '@/lib/db/prisma';
import React from 'react';
import { FollowingUsers } from './FollowingUsers';

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const users = await prisma.user.findUnique({
    where: { id: params.id },
    include: { following: true },
  });
  return (
    <section className='max-w-[400px] mx-auto'>
      <FollowingUsers followingUsers={users!.following} />
      {!users!.following.length && (
        <h1 className='text-muted-foreground '>
          Following accounts is an easy way to curate your timeline and know
          what’s happening with the topics and people you’re interested in.
        </h1>
      )}
    </section>
  );
};

export default page;
