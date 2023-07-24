
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { format } from 'timeago.js';
import { CommentsPostIcon } from './post-icons/CommentsPostIcon';
import { LikeIcon } from './post-icons/LikeIcon';
import { DeletePostIcon } from './post-icons/DeletePostIcon';
import { ChartBarPostIcon } from './post-icons/ChartBarPostIcon';
import { SharePostIcon } from './post-icons/SharePostIcon';
import { PostWithLikes } from './Feed';
import Link from 'next/link';

export const PostBlock = ({ post }: { post: PostWithLikes }) => {


  return (
    <div className='flex p-3  border-b border-gray-200  '>
      <div className=' p-2'>
        <Image
          width={500}
          height={500}
          className='h-11 w-11 object-cover rounded-full mr-12'
          alt='post_image '
          src={post.authorImage}
        />
      </div>
      <div>
        {/* post user info */}
        <div className='flex items-center space-x-1 whitespace-nowrap w-full justify-between '>
          <div className='flex  items-center justify-between gap-1'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post.authorName}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              {post.authorUserName}
            </span>
            <span className='text-sm sm:text-[14px] hover:underline text-gray-400 '>
              {format(post.createdAt)}
            </span>
          </div>

          <EllipsisHorizontalIcon className='h-8 w-8 hoverEffect hover:bg-sky-100 hover:text-sky-500' />
        </div>
        {/* post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {post.content}
        </p>
        {/* <div className='mr-2 sm:h-72 h-60 group overflow-hidden rounded-xl'> */}
        <Link href={'post/'+post.id} className=' '>
        <Image
          height={500}
          width={500}
          
          alt='post_image'
          src={post.image!}
          className='rounded-xl  object-cover mr-2 '
        />
        </Link>
        {/* </div> */}

        {/* ICON BLOCK */}
        <div className=' flex justify-between items-center   text-gray-500    mt-2 '>
          <CommentsPostIcon post={post} />
          <LikeIcon post={post} />
          <DeletePostIcon postId={post.id} />
          <SharePostIcon />
          <ChartBarPostIcon />
        </div>
      </div>
    </div>
  );
};
