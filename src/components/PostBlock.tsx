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
import { UserAvatar } from './UserAvatar';

export const PostBlock = ({ post }: { post: PostWithLikes }) => {
  return (
    <div className='flex p-3  border-b border-border bg-secondary/20  '>
      <UserAvatar  userImage={post.authorImage} />
      <div className='w-full' >
        {/* post user info */}
        <div className='flex items-center space-x-1 whitespace-nowrap w-full justify-between '>
          <div className='flex  items-center justify-between gap-1'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post.authorName}
            </h4>
            <span className='text-sm sm:text-[15px] text-muted-foreground'>
              {post.authorUserName}
            </span>
            <span className='text-sm sm:text-[14px] hover:underline text-muted-foreground/50 '>
              {format(post.createdAt)}
            </span>
          </div>

          <EllipsisHorizontalIcon className='h-8 w-8 rounded-full transition cursor-pointer hover:bg-sky-100 hover:text-sky-500' />
        </div>
        {/* post text */}
        <p className='text-muted-foreground text-[15px] sm:text-[16px] mb-2'>
          {post.content}
        </p>
        {/* <div className='mr-2 sm:h-72 h-60 group overflow-hidden rounded-xl'> */}
        <Link href={'post/' + post.id}>
          <Image
            height={500}
            width={600}
            alt='post_image'
            src={post.image!}
            className='rounded-xl  object-cover mr-2 '
          />
        </Link>
        {/* </div> */}

        {/* ICON BLOCK */}
        <div className=' flex justify-between items-center   text-muted-foreground    mt-2 '>
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
