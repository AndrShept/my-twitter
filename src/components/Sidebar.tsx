'use client';
import Image from 'next/image';
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SignInButton } from './SignInButton';
import { ModeToggle } from './ToggleMode';
import { Button } from './ui/button';
import Link from 'next/link';
import { UserSessionMenu } from './UserSessionMenu';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className='  p-1 fixed flex top-0 flex-col items-center xl:items-start h-full '>
      <Link href={'/'}>
        <Image
          priority
          className={
            ' cursor-pointer dark:bg-primary   border-primary dark:border-2 rounded-full xl:ml-3'
          }
    
          height='40'
          width='40'
          src={
            'https://cdn-icons-png.flaticon.com/128/6821/6821373.png?ga=GA1.1.6462837.1683122541&track=ais'
            // '/logoX.png'
          }
          alt='logo'
        />
      </Link>
      <div className='mt-4 mb-2.5 xl:items-start  '>
        <SidebarMenuItem authProtectNum={session ? 10 : 2} />
      </div>

      {session ? (
        <div>
          {/* <Button className='rounded-full w-56 h-12 font-bold shadow-md text-lg mt-10 hidden xl:inline'>
            Post
          </Button>
          <Button
            className='rounded-full  xl:hidden flex mt-10 '
            variant={'default'}
            size={'icon'}
          >
            <Plus />
          </Button> */}
        </div>
      ) : (
        <SignInButton />
      )}
      <div className='xl:ml-7 mb-2 mt-auto'>
        <ModeToggle />
      </div>
      <UserSessionMenu />
    </div>
  );
};
