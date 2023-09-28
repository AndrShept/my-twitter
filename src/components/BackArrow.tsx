'use client';
import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackArrow = () => {
  const router = useRouter();
  return (
    <Button className='rounded-full'   variant={'ghost'} size={'icon'} onClick={() => router.back()}>
      <ChevronLeft  />
    </Button>
  );
};
