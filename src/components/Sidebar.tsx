import Image from 'next/image';
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { UserMenu } from './UserMenu';
import { SignInButton } from './SignInButton';
import { ModeToggle } from './ToggleMode';

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='hidden sm:flex flex-col p-1  xl:items-start xl:justify-center  fixed h-full xl:ml-24'>
      <Image
        priority
        className='cursor-pointer  hoverEffect '
        height='70'
        width='70'
        src={'https://help.twitter.com/content/dam/help-twitter/brand/logo.png'}
        alt='logo'
      />

      <div className='mt-4 mb-2.5 xl:items-start  '>
        <SidebarMenuItem authProtectNum={session ? 10 : 2} />
      </div>

      {session ? (
        <button className='bg-blue-400 text-primary rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
          Tweet
        </button>
      ) : (
        <SignInButton />
      )}

      <div className='dropdown dropdown-top dropdown-right mx-auto hover:bg-secondary/40 rounded-full duration-500    cursor-pointer text-muted-foreground flex  mt-auto mb-6'>
        <label tabIndex={0}>
          {session && 
            <div className='flex items-center cursor-pointer  xl:px-6 xl:py-3'>
              {' '}
              <Image
                className='rounded-full  hover:brightness-95'
                height={50}
                width={50}
                alt='avatar'
                src={session?.user.image ?? ''}
              />
              <div className='leading-5 hidden xl:inline ml-3'>
                <h4 className='font-bold'>{session?.user.name}</h4>
                <p className='text-muted-foreground'> {session?.user.username}</p>
              </div>
              <EllipsisHorizontalIcon className='h-7 w-7 xl:ml-8 xl:inline hidden  ' />
            </div>
          }
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
        >
          <UserMenu session={session!} />
        </ul>
      </div>
      <ModeToggle/>
    </div>
  );
};
