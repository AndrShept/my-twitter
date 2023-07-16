import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { Session } from 'next-auth';

export const Input = ({session}:{session: Session}) => {
   

  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
      <div className='w-[68px]'>
        <Image
          className='ml-2 rounded-full w-11 h-11 object-cover cursor-pointer hover:brightness-95 '
          height={400}
          width={400}
          alt='avatar_img'
          src={session?.user.image || ''}
        />
      </div>
      <div className='w-full divide-y divide-gray-200'>
        <textarea
          className=' w-full p-2  text-lg  placeholder-gray-400  tracking-wide min-h-[50px] text-gray-700'
          rows={2}
          placeholder='Whats happening'
        />

        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex'>
            <PhotoIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
            <FaceSmileIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
          </div>
          <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};
