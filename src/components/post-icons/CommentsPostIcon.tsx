'use client';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { CommentModal } from '../CommentModal';
import { useSession } from 'next-auth/react';
import { PostLikeAndComments } from '@/@types/postTypes';

export const CommentsPostIcon = ({ post }:PostLikeAndComments ) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (session) {
      setIsModalOpen((prev) => !prev);
    }
  };
  return (
    <>
      <div
        onClick={handleClick}
        data-tip='comments'
        className='tooltip   p-2 rounded-full transition cursor-pointer hover:text-sky-500  hover:bg-secondary flex items-center justify-center gap-1 group'
      >
        <ChatBubbleLeftIcon className='h-5 w-5 active:scale-110 ' />
        {post._count.comments > 0 && (
          <span className='group-hover:text-sky-500 duration-300 text-xs  font-semibold'>
            {post._count.comments}
          </span>
        )}
      </div>
      {isModalOpen && (
        <CommentModal post={post} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};
