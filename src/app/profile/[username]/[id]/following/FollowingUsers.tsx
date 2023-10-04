'use client';
import { Following } from '@prisma/client';
import React from 'react';
import { UserAvatar } from '@/components/UserAvatar';
import { FollowButton } from '@/components/FollowButton';
import { useRouter } from 'next/navigation';

export const FollowingUsers = ({
  followingUsers,
}: {
  followingUsers: Following[];
}) => {
  followingUsers.sort((a: any, b: any) => b.createdAt - a.createdAt);
  const router = useRouter();

  return (
    <>
      {followingUsers.map((user) => (
        <li
          onClick={() =>
            router.push(`/profile/${user.followingName}/${user.followingId}`)
          }
          key={user.id}
          className='flex items-center px-6 rounded-md py-4 cursor-pointer hover:bg-secondary/50 transition border-b'
        >
          <UserAvatar
            userName={user.followingUserName || ''}
            className='mr-0'
            userId={user.id}
            userImage={user.followingImage || ''}
          />
          <div className='truncate ml-4 leading-5'>
            <h4 className='font-semibold hover:underline text-muted-foreground text-[14px] truncate'>
              {user.followingName}
            </h4>
            <h5 className='text-[13px] text-muted-foreground/60 truncate'>
              {`@${user.followingName?.replace(' ', '')}`}
            </h5>
          </div>

          <FollowButton
            followingsArr={followingUsers}
            followingId={user.followingId}
            followingImage={user.followingImage}
            followingUserName={`@${user.followingName?.replace(' ', '')}`}
            followingName={user.followingName}
          />
        </li>
      ))}
    </>
  );
};
