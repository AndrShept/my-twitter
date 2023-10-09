'use client';
import { signIn } from 'next-auth/react';
import React, { useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Loader2, User2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async () => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 2000));
      await signIn('google');
      toast.success('Successfully login!');
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            size={'icon'}
            onClick={handleSignIn}
            disabled={isPending}
            className=' rounded-full mt-10 xl:w-36 xl:h-12 font-bold shadow-md text-lg flex   items-center justify-center gap-4   '
          >
            <span>
              {isPending ? <Loader2 className='animate-spin' /> : <User2 />}
            </span>
            <span className='xl:inline hidden '>Sign In</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Login</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
