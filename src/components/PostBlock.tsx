'use client';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { format } from 'timeago.js';
import { CommentsPostIcon } from './post-icons/CommentsPostIcon';
import { LikeIcon } from './post-icons/LikeIcon';
import { DeletePostIcon } from './post-icons/DeletePostIcon';
import { ChartBarPostIcon } from './post-icons/ChartBarPostIcon';
import { SharePostIcon } from './post-icons/SharePostIcon';
import Link from 'next/link';
import { UserAvatar } from './UserAvatar';
import { useRouter } from 'next/navigation';
import { BookmarkIcon } from './post-icons/BookmarkIcon';
import { Comment, FavoritePost, Like, Post } from '@prisma/client';

export interface PostProps {
  post: Post & { comments: Comment[] } & { likes: Like[] } & {
    _count: { likes: number; comments: number };
  };
  favoritePost: FavoritePost[];
}

export const PostBlock = ({ post, favoritePost }: PostProps) => {
  const router = useRouter();
  const updatePost = async () => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex p-3  border-b border-border bg-secondary/20  '>
        <UserAvatar userImage={post.authorImage} />
        <div className='w-full'>
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
          <Link onClick={updatePost} href={'post/' + post.id}>
            <Image
              height={500}
              width={600}
              alt='post_image'
              src={post.image!}
              className='rounded-xl  object-cover mr-2 border border-border '
            />
          </Link>

          {/* ICON BLOCK */}
          <div className=' flex justify-between items-center   text-muted-foreground    mt-2 '>
            <CommentsPostIcon post={post} />
            <LikeIcon post={post} />
            <DeletePostIcon postId={post.id} />
            <SharePostIcon />
            <ChartBarPostIcon viewCount={post.view} />
            <BookmarkIcon postId={post.id} favoritePost={favoritePost} />
          </div>
        </div>
      </div>
    </>
  );
};
