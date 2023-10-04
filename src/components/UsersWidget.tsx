'use client';
import { Following, User } from '@prisma/client';
import React from 'react';
import { FollowButton } from './FollowButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserAvatar } from './UserAvatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const UsersList = ({
  allUsers,
  followingArr,
}: {
  allUsers: User[];
  followingArr: Following[];
}) => {
  const { data: session } = useSession();

  const router = useRouter();
  if (!session) return;

  return (
    <>
      {allUsers.map(
        (user) =>
          session.user.id !== user.id && (
            <div
              key={user.id}
              onClick={() =>
                router.push(`/profile/${user.username}/${user.id}`)
              }
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
                followingsArr={followingArr}
                followingId={user.id}
                followingImage={user.image}
                followingUserName={`@${user.name?.replace(' ', '')}`}
                followingName={user.name}
              />
            </div>
          )
      )}
    </>
  );
};
