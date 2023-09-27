'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Following } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  followingId: string | null;
  followingUserName: string | null;
  followingImage: string | null;
  followingName: string | null;
  followingsArr?: Following[] | undefined;
}

export const FollowButton = ({
  followingId,
  followingUserName,
  followingImage,
  followingName,
  followingsArr,
}: FollowButtonProps) => {
  const router = useRouter();
  const followingExist = followingsArr?.some(
    (following) => following.followingId === followingId
  );
  const [followingExistState, setFollowingExistState] =
    useState(followingExist);
  const addFollowingUsers = async () => {
    const followingUser = {
      followingId,
      followingUserName,
      followingImage,
      followingName,
    };
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(followingUser),
      });
      setFollowingExistState(!followingExistState);
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error, 'something went wrong [ADD FOLLOWING] ');
    }
  };

  return (
    <>
      {!followingExistState ? (
        <Button
          onClick={addFollowingUsers}
          variant={'default'}
          size={'sm'}
          className=' rounded-full text-sm ml-auto '
        >
          <span>Follow</span>
        </Button>
      ) : (
        <Button
          onClick={addFollowingUsers}
          variant={'outline'}
          size={'sm'}
          className=' rounded-full text-sm ml-auto group transition  hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50'
        >
          <span className='group-hover:hidden block '> Following</span>
          <span className='group-hover:block hidden '> Unfollow</span>
        </Button>
      )}
    </>
  );
};