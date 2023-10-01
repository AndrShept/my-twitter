import { User } from '@prisma/client';
import React from 'react';
import { FollowButton } from './FollowButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserAvatar } from './UserAvatar';

export const UsersList = async ({ users }: { users: User[] }) => {
  const session = await getServerSession(authOptions);

  if (!session) return;
  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: { following: true },
  });

  return (
    <>
      {users.map(
        (user) =>
          session.user.id !== user.id && (
            <li
              key={user.id}
              className='flex items-center px-4 py-2 cursor-pointer hover:bg-secondary/50 transition'
            >
              <UserAvatar
                userName={user.name || ''}
                className='mr-0'
                userId={user.id}
                userImage={user.image || ''}
              />
              <div className='truncate ml-4 leading-5'>
                <h4 className='font-semibold hover:underline text-muted-foreground text-[14px] truncate'>
                  {user.name}
                </h4>
                <h5 className='text-[13px] text-muted-foreground/60 truncate'>
                  {`@${user.name?.replace(' ', '')}`}
                </h5>
              </div>

              <FollowButton
                followingsArr={userData?.following}
                followingId={user.id}
                followingImage={user.image}
                followingUserName={`@${user.name?.replace(' ', '')}`}
                followingName={user.name}
              />
            </li>
          )
      )}
    </>
  );
};
