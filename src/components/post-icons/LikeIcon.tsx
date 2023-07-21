'use client';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { PostWithLikes } from '../Feed';

export const LikeIcon = ({ post }: { post: PostWithLikes }) => {
  const [likes, setLikes] = useState(post.like);
  const { data: session } = useSession();

  const likeById = likes.some((item) => item.authorId === session?.user.id);

  const addLike = async () => {
    const newLike = {
      authorId: session!.user.id,
      postId: post.id,
      id: new Date().toString(),
    };
    setLikes((prev) => [...prev, newLike]);
    try {
      const res = await fetch(`api/posts/${post.id}/likes`, {
        method: 'POST',
        body: JSON.stringify(session?.user.id),
      });


    } catch (error) {
      console.log(error);
    }
  };
  const deleteLike = async () => {
    setLikes((prev) => [
      ...prev.filter((item) => item.authorId !== session!.user.id),
    ]);
    try {
      const res = await fetch(`api/posts/${post.id}/likes`, {
        method: 'DELETE',
        body: JSON.stringify(session?.user.id),
      });


    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!likeById ? (
        <div
          onClick={addLike}
          data-tip='like?'
          className='tooltip group  iconHoverEffect hover:bg-red-100 flex items-center justify-center gap-1 '
        >
          <HeartIcon className='h-5 w-5 text-gray-500 active:scale-110    group-hover:text-red-600 duration-300    ' />
          <span className='group-hover:text-red-600 text-xs font-semibold'>
            {likes.length}
          </span>
        </div>
      ) : (
        <div
          onClick={deleteLike}
          data-tip='like?'
          className='tooltip group  iconHoverEffect hover:bg-red-100 flex items-center justify-center gap-1 '
        >
          <HeartIconSolid className='h-5 w-5 text-red-600 active:scale-110    group-hover:text-red-600 duration-300    ' />
          <span className='group-hover:text-red-600 text-xs  font-semibold'>
            {likes.length}
          </span>
        </div>
      )}
    </>
  );
};
