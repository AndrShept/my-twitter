'use client';
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
        <span>Settings</span>
      </li>
      {!session ? (
        <li>
          <span onClick={signInUser}>
            Login
            {isPending && (
              <span className='loading loading-spinner text-gray-400 loading-md' />
            )}
          </span>
        </li>
      ) : (
        <li>
          <span onClick={signOutUser}>
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
