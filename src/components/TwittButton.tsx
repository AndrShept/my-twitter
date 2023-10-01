'use client';
import React from 'react';
import { experimental_useFormStatus } from 'react-dom';
import { toast } from 'react-hot-toast';

export const TwittButton = () => {
  const { pending, method } = experimental_useFormStatus();
  if (method) {
    toast.success('Post created!!');
  }
  return (
    <button
      disabled={pending}
      type='submit'
      className='bg-blue-400 text-primary px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
    >
      Tweet
      {pending && (
        <span className='loading loading-spinner text-muted-foreground loading-sm' />
      )}
    </button>
  );
};
