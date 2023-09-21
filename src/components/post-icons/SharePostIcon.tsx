import { ShareIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const SharePostIcon = () => {
  return (
    <div
      data-tip='share'
      className=' tooltip p-2 rounded-full transition cursor-pointer  hover:text-sky-500 hover:bg-secondary flex items-center justify-center '
    >
      <ShareIcon className=' h-5 w-5 ' />
    </div>
  );
};
