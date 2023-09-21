import { ShareIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const SharePostIcon = () => {
  return (
    <div
      data-tip='share'
      className=' tooltip p-2 rounded-full transition cursor-pointer hover:bg-sky-100 flex items-center justify-center '
    >
      <ShareIcon className=' h-5 w-5 text-gray-500   hover:text-sky-500 duration-300    ' />
    </div>
  );
};
