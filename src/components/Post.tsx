import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

interface PostProps {
  id: string;
  image: string;
  userImage: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  username: string;
  createdAt: string;
}

export const Post = ({ post }: { post: PostProps }) => {
  return (
    <div className='flex p-3  border-b border-gray-200  '>
      <div className=' p-2'>
        <Image
          width={500}
          height={500}
          className='h-11 w-11 object-cover rounded-full mr-12'
          alt='post_image '
          src={post.userImage}
        />
      </div>
      <div>
        {/* post user info */}
        <div className='flex items-center space-x-1 whitespace-nowrap w-full justify-between '>
          <div className='flex  items-center justify-between gap-1'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post.username}
            </h4>
            <span className='text-sm sm:text-[15px]'>@{post.username}</span>
            <span className='text-sm sm:text-[15px] hover:underline '>
              {post.createdAt}
            </span>
          </div>

          <EllipsisHorizontalIcon className='h-8 w-8 hoverEffect hover:bg-sky-100 hover:text-sky-500' />
        </div>
        {/* post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {post.content}
        </p>
        {/* <div className='mr-2 sm:h-72 h-60 group overflow-hidden rounded-xl'> */}
          <Image
            height={500}
            width={500}
            alt='post_image'
            src={post.image}
            className='rounded-xl  object-cover mr-2 '
          />
        {/* </div> */}

        {/* ICON BLOCK */}
        <div className='flex justify-between items-center  text-gray-500    mt-2 '>
          <div className='  iconHoverEffect hover:bg-sky-100 flex items-center justify-center '>
            <ChatBubbleLeftIcon className='h-5 w-5 text-gray-500 active:scale-110   hover:text-sky-500 duration-300    ' />
          </div>
          <div className='  iconHoverEffect hover:bg-red-100 flex items-center justify-center '>
            <TrashIcon className='h-5 w-5 text-gray-500 active:scale-110   hover:text-red-600 duration-300    ' />
          </div>
          <div className='  iconHoverEffect hover:bg-red-100 flex items-center justify-center '>
            <HeartIcon className='h-5 w-5 text-gray-500 active:scale-110    hover:text-red-600 duration-300    ' />
          </div>
          <div className='  iconHoverEffect hover:bg-sky-100 flex items-center justify-center '>
            <ShareIcon className='h-5 w-5 text-gray-500   hover:text-sky-500 duration-300    ' />
          </div>
          <div className='  iconHoverEffect hover:bg-sky-100 flex items-center justify-center '>
            <ChartBarIcon className='h-5 w-5 text-gray-500   hover:text-sky-500 duration-300    ' />
          </div>
        </div>
      </div>
    </div>
  );
};
