'use client';
import { signIn, useSession } from 'next-auth/react';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast';

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async () => {
    startTransition(async () => {
      await signIn('google');
      toast.success('Successfully login!');
  
    });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isPending}
      className='bg-blue-400 text-primary rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:flex disabled:bg-secondary/40  items-center justify-center gap-4   '
    >
      {isPending && (
        <span className='loading loading-spinner loading-sm text-muted-foreground' />
      )}
      <span>Sign In</span>
    </button>
  );
};
