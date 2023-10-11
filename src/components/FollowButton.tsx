'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Following } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const router = useRouter();
  const followingExist = followingsArr?.some(
    (following) => following.followingId === followingId
  );
  const [followingExistState, setFollowingExistState] =
    useState(followingExist);
  const addFollowingUsers = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!session) {
      return;
    }
    const followingUser = {
      followingId,
      followingUserName,
      followingImage,
      followingName,
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(followingUser)
       
      });
      setFollowingExistState(!followingExistState);
      if (res.ok) {
        router.prefetch('/api/users');
      }
    } catch (error) {
      console.log(error, 'something went wrong [ADD FOLLOWING] ');
    }
  };
  useEffect(() => {
    setFollowingExistState(followingExist);
  }, []);
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
          className=' rounded-full text-sm ml-auto text-primary group transition  hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50'
        >
          <span className='group-hover:hidden block '> Following</span>
          <span className='group-hover:block hidden '> Unfollow</span>
        </Button>
      )}
    </>
  );
};
