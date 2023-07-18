'use client';
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast'



export const UserMenu = ({ session }: { session: Session }) => {
  const [isPending, startTransition] = useTransition();

   const signInUser = async () => {
    startTransition(async () => {
      await signIn('google');
      toast.success('Successfully login!')
    });
  };
  const signOutUser = async () => {
    startTransition(async () => {
      await signOut();
    });
  };
  return (
    <>
      <li>
        <span> <Cog6ToothIcon className="h-6 w-6 text-gray-500" /> Settings</span>
      </li>
      {!session ? (
        <li>
          <span onClick={signInUser}>
          <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
            Login
            {isPending && (
              <span className='loading loading-spinner text-gray-400 loading-md' />
            )}
          </span>
        </li>
      ) : (
        <li>
          <span onClick={signOutUser}> 
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-500" />
            Sign Out
            {isPending && (
              <span className='loading loading-spinner text-gray-400 loading-md' />
            )}
         
          </span>
        </li>
      )}
    </>
  );
};
