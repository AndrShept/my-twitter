'use client';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { CommentModal } from '../CommentModal';
import { PostWithLikes } from '../Feed';
import { useSession } from 'next-auth/react';

export const CommentsPostIcon = ({ post }: { post: PostWithLikes }) => {
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
        className='tooltip   p-2 rounded-full transition cursor-pointer hover:bg-sky-100 flex items-center justify-center gap-1 group'
      >
        <ChatBubbleLeftIcon className='h-5 w-5 text-gray-500 active:scale-110   hover:text-sky-500 duration-300    ' />
        {post.comments.length > 0 && (
          <span className='group-hover:text-sky-500 duration-300 text-xs  font-semibold'>
            {post.comments.length}
          </span>
        )}
      </div>
      {isModalOpen && (
        <CommentModal post={post} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};
