import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const EditIcon = () => {
  return (
    <div className='flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 duration-200  rounded-md'>
      <span className='ml-4'>
        <PencilSquareIcon className='h-6 w-6 text-gray-500' />
      </span>
      <span>Edit</span>
    </div>
  );
};
