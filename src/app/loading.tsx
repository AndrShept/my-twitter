import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MyLoader = (props: any) => (
  <>
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className=' w-[250px] h-[300px]' />
      </div>
    </div>
  </>
);

export default MyLoader;
