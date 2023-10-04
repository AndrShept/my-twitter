'use client'
import React, { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export const UserSessionMenu = () => {

  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const signInUser = async () => {
    startTransition(async () => {
      await signIn('google');
      toast.success('Successfully login!');
    });
  };
  const signOutUser = async () => {
    startTransition(async () => {
      await signOut();
    
    });
  };
  return (
    <div className=' mx-auto hover:bg-secondary/40 rounded-full duration-500    cursor-pointer  flex  mt-auto mb-6'>
      <DropdownMenu >
        <DropdownMenuTrigger>
          {session && (
            <div className='flex items-center cursor-pointer  xl:px-6 xl:py-3'>
            
              <Image
                className='rounded-full  hover:brightness-95'
                height={50}
                width={50}
                alt='avatar'
                src={session?.user.image ?? ''}
              />
              <div className='leading-5 hidden xl:inline ml-3'>
                <h4 className='font-bold'>{session?.user.name}</h4>
                <p className='text-muted-foreground'>
                  {' '}
                  {session?.user.username}
                </p>
              </div>
              <EllipsisHorizontalIcon className='h-7 w-7 xl:ml-8 xl:inline hidden  ' />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          side='right'
          sideOffset={10}
          alignOffset={40}
          className='xl:w-56 w-max'

        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <span className='flex items-center gap-2'>
              {' '}
              <Cog6ToothIcon className='h-6 w-6 text-muted-foreground' />{' '}
              Settings
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem >
            {!session ? (
              <div className='flex items-center gap-2' onClick={signInUser}>
                <Cog6ToothIcon className='h-6 w-6 text-muted-foreground' />
                Login
                {isPending && (
                  <span className='loading loading-spinner text-muted-foreground loading-md' />
                )}
              </div>
            ) : (
              <div className='flex items-center gap-2' onClick={signOutUser}>
                <ArrowLeftOnRectangleIcon className='h-6 w-6 text-muted-foreground' />
                Sign Out
                {isPending && (
                  <span className='loading loading-spinner text-muted-foreground loading-md' />
                )}
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
