import { ChartBarIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const ChartBarPostIcon = () => {
  return (
    <div className='p-2 rounded-full transition cursor-pointer hover:bg-sky-100 flex items-center justify-center'>
      <ChartBarIcon className='h-5 w-5 text-gray-500   hover:text-sky-500 duration-300    ' />
    </div>
  );
};
