import Image from 'next/image';
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='hidden sm:flex flex-col p-1  xl:items-start xl:justify-center fixed h-full xl:ml-24'>
      <Image
        className='cursor-pointer hoverEffect  '
        height='70'
        width='70'
        src={'https://help.twitter.com/content/dam/help-twitter/brand/logo.png'}
        alt='logo'
      />

      <div className='mt-4 mb-2.5 xl:items-start  '>
        <SidebarMenuItem />
      </div>
      <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
        Tweet
      </button>
      <div className='hoverEffect px-4 text-gray-700 flex items-center justify-center xl:justify-start mt-auto mb-4'>
        <Image
          className='rounded-full xl:mr-2'
          height={50}
          width={50}
          alt='avatar'
          src={session?.user.image ?? ''}
        />
        <div className='leading-5 hidden xl:inline'>
          <h4 className='font-bold'>Smart Andr</h4>
          <p className='text-gray-500'> @shipa_top</p>
        </div>
      </div>
    </div>
  );
};
