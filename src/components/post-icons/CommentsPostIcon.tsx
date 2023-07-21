import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const CommentsPostIcon = () => {
  return (
    <div
      data-tip='comment'
      className='tooltip  iconHoverEffect hover:bg-sky-100 flex items-center justify-center '
    >
      <ChatBubbleLeftIcon className='h-5 w-5 text-gray-500 active:scale-110   hover:text-sky-500 duration-300    ' />
    </div>
  );
};
