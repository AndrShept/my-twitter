'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FollowButton } from './FollowButton';

interface FollowUsersProps {
  randomUsers: any[];
}

export const RandomFollowUsers = ({ randomUsers }: FollowUsersProps) => {
  console.log(randomUsers);
  const [randomUsersCount, setRandomUsersCount] = useState(5);
  return (
    <>
      {randomUsers.slice(0, randomUsersCount).map((randomUser) => (
        <div
          key={randomUser.login.username}
          className='flex items-center px-4 py-2 cursor-pointer hover:bg-secondary/50 transition'
        >
          <Image
            className='rounded-full object-cover h-14 w-14'
            width={500}
            height={500}
            alt='avatar-img'
            src={randomUser.picture.thumbnail}
          />
          <div className='truncate ml-4 leading-5'>
            <h4 className='font-semibold hover:underline text-muted-foreground text-[14px] truncate'>
              {randomUser.login.username}
            </h4>
            <h5 className='text-[13px] text-muted-foreground/60 truncate'>
              {randomUser.name.first + ' ' + randomUser.name.last}
            </h5>
          </div>

          <FollowButton
            followingId={randomUser.login.uuid}
            followingImage={randomUser.picture.thumbnail}
            followingName={randomUser.login.username}
            followingUserName={
              randomUser.name.first + ' ' + randomUser.name.last
            }

          />
        </div>
      ))}
      <button
        onClick={() => setRandomUsersCount((prev) => prev + 5)}
        className='text-blue-400 pl-4  font-medium hover:text-blue-500 text-sm mt-2'
      >
        show more...
      </button>
      <button
        onClick={() => setRandomUsersCount(-1)}
        className='text-blue-400 pl-4 pr-4 pb-3 font-medium hover:text-blue-500 block text-sm '
      >
        show all news...
      </button>
    </>
  );
};
