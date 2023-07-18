'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface FollowUsersProps {
  randomUsers: any[];
}

export const FollowUsers = ({ randomUsers }: FollowUsersProps) => {
  const [randomUsersCount, setRandomUsersCount] = useState(5);
  return (
    <>
      {randomUsers.slice(0, randomUsersCount).map((randomUser) => (
        <div
          key={randomUser.login.username}
          className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200'
        >
          <Image
            className='rounded-full object-cover h-14 w-14'
            width={500}
            height={500}
            alt='avatar-img'
            src={randomUser.picture.thumbnail}
          />
          <div className='truncate ml-4 leading-5'>
            <h4 className='font-bold hover:underline text-[14px] truncate'>
              {randomUser.login.username}
            </h4>
            <h5 className='text-[13px] text-gray-500 truncate'>
              {randomUser.name.first + ' ' + randomUser.name.last}
            </h5>
          </div>
          <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5'>
            Follow
          </button>
        </div>
      ))}
      <button
        onClick={() => setRandomUsersCount((prev) => prev + 5)}
        className='text-blue-400 pl-4  font-medium hover:text-blue-500 italic'
      >
        show more...
      </button>
      <button
        onClick={() => setRandomUsersCount(-1)}
        className='text-blue-400 pl-4 pr-4 pb-3 font-medium hover:text-blue-500 block italic'
      >
        show all news...
      </button>
    </>
  );
};
