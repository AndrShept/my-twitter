'use client';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import { CommentModal } from '../CommentModal';
import { PostWithLikes } from '../Feed';

export const CommentsPostIcon = ({ post }: { post: PostWithLikes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        data-tip='comments'
        className='tooltip   iconHoverEffect hover:bg-sky-100 flex items-center justify-center gap-1 group'
      >
        <ChatBubbleLeftIcon className='h-5 w-5 text-gray-500 active:scale-110   hover:text-sky-500 duration-300    ' />
        <span className='group-hover:text-sky-500 duration-300 text-xs  font-semibold'>
          {post.comments.length}
        </span>
      </div>
      {isModalOpen && (
        <CommentModal post={post} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};
