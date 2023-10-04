'use client';
import { FollowButton } from '@/components/FollowButton';
import { UserAvatar } from '@/components/UserAvatar';
import { Follower, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const FollowersUsers = ({
  followersUsers,
}: {
  followersUsers: User[];
}) => {
  const router = useRouter();
  return (
    <div>
      {followersUsers.map((user) => (
        <li
          onClick={() =>
            router.push(`/profile/${user.name}/${user.id}`, { scroll: false })
          }
          key={user.id}
          className='flex items-center px-6 rounded-md py-4 cursor-pointer hover:bg-secondary/50 transition border-b'
        >
          <UserAvatar
            userName={user.username || ''}
            className='mr-0'
            userId={user.id}
            userImage={user.image || ''}
          />
          <div className='truncate ml-4 leading-5 text-left'>
            <h4 className='font-semibold hover:underline text-muted-foreground text-[14px] truncate'>
              {user.name}
            </h4>
            <h5 className='text-[13px] text-muted-foreground/60 truncate'>
              {`@${user.name?.replace(' ', '')}`}
            </h5>
          </div>
        </li>
      ))}
    </div>
  );
};
