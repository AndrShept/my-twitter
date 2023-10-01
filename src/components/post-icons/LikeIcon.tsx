'use client';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostLikeAndComments } from '@/@types/postTypes';

export const LikeIcon = ({ post }: PostLikeAndComments) => {
  const { data: session } = useSession();
  const likeExist = post.likes.some(
    (like) => like.authorId === session?.user.id
  );
  const router = useRouter();
  const [likeState, setLikesState] = useState<boolean | undefined>();
  const [likeCount, setLikeCount] = useState(post._count.likes);

  const addLike = async () => {
    if (!session) return;
    setLikesState(!likeState);

    if (!likeState) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
    console.log(likeState);
    try {
      const res = await fetch(`/api/posts/${post.id}/likes`, {
        method: 'POST',
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLikesState(likeExist);
    setLikeCount(post._count.likes);
  }, [likeExist, post._count.likes]);
  return (
    <>
      {!likeState || !session ? (
        <div
          onClick={addLike}
          data-tip='like?'
          className='tooltip group  p-2 rounded-full transition cursor-pointer hover:text-red-500  hover:bg-secondary flex items-center justify-center gap-1 '
        >
          <HeartIcon className='h-5 w-5 active:scale-110   ' />
          {likeCount > 0 && (
            <span className='group-hover:text-red-600 text-xs  font-semibold'>
              {likeCount}
            </span>
          )}
        </div>
      ) : (
        <div
          onClick={addLike}
          data-tip='like?'
          className='tooltip group  p-2 rounded-full transition cursor-pointer hover:text-red-600  hover:bg-secondary flex items-center justify-center gap-1 '
        >
          <HeartIconSolid className='h-5 w-5 text-red-600 active:scale-110       ' />
          {likeCount > 0 && (
            <span className='group-hover:text-red-600 text-xs  font-semibold'>
              {likeCount}
            </span>
          )}
        </div>
      )}
    </>
  );
};
