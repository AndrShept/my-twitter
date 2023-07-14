'use client'
import { signIn } from 'next-auth/react';
import React from 'react';

export const Button = () => {
  return (
    <div>
      {' '}
      <button
        onClick={() => signIn('google')}
        className='btn btn-primary'
      ></button>
    </div>
  );
};
