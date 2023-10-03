import { UsersList } from '@/components/UsersList';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const users = await prisma.user.findUnique({
    where: { id: params.id },
    include: { following: true },
  });
  console.log(users);
  return (
    <div className='max-w-sm mx-auto'>
      <UsersList users={users?.following} />
    </div>
  );
};

export default page;
