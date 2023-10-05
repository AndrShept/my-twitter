import Image from 'next/image';
import React, { useTransition } from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SignInButton } from './SignInButton';
import { ModeToggle } from './ToggleMode';
import { Button } from './ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserSessionMenu } from './UserSessionMenu';

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='hidden sm:flex flex-col p-1  xl:items-start xl:justify-center items-center  fixed h-full xl:ml-24'>
      <Link href={'/'}>
        <Image
          priority
          className={
            'cursor-pointer dark:bg-primary   border-primary dark:border-2 rounded-full xl:ml-3'
          }
          height='40'
          width='40'
          src={
            'https://cdn-icons-png.flaticon.com/128/6821/6821373.png?ga=GA1.1.6462837.1683122541&track=ais'
          }
          alt='logo'
        />
      </Link>
      <div className='mt-4 mb-2.5 xl:items-start  '>
        <SidebarMenuItem authProtectNum={session ? 10 : 2} />
      </div>

      {session ? (
        <div>
          <Button className='rounded-full w-56 h-12 font-bold shadow-md text-lg mt-10 hidden xl:inline'>
            Post
          </Button>
          <Button
            className='rounded-full  xl:hidden flex mt-10 '
            variant={'default'}
            size={'icon'}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <SignInButton />
      )}
      <UserSessionMenu />

      <div className='xl:ml-7 mb-2'>
        <ModeToggle />
      </div>
    </div>
  );
};
