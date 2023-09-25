'use client';
import { signIn } from 'next-auth/react';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async () => {
    startTransition(async () => {
      await signIn('google');
      toast.success('Successfully login!');
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isPending}
      className=' rounded-full w-36 h-12 font-bold shadow-md text-lg hidden xl:flex   items-center justify-center gap-4   '
    >
      {isPending && (
        <span className='loading loading-spinner loading-sm text-muted-foreground' />
      )}
      <span>Sign In</span>
    </Button>
  );
};
