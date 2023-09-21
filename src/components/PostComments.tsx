'use client';
import React, { useState, useTransition } from 'react';
import { UserAvatar } from './UserAvatar';
import { format } from 'timeago.js';
import { PostWithLikes } from './Feed';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { API_URL } from '@/lib/utils/baseUrl';
import { useRouter } from 'next/navigation';
import { CommentsDropDownMenu } from './CommentsDropDownMenu';

export const PostComments = ({ post }: { post: PostWithLikes }) => {
  const [newComment, setNewComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [newCommentId, setNewCommentId] = useState('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      startTransition(async () => {
        const res = await fetch(`${API_URL}comments/${commentId}`, {
          method: 'PUT',
          body: JSON.stringify(newComment),
        });
        if (res.ok) {
          router.refresh();
          setCommentId('');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {post.comments.map((comment, i) => (
        <div className='chat chat-start gap-4 mt-4' key={comment.id}>
          <div className='chat-image avatar self-start '>
            <div className='w-10 rounded-full mt-2'>
              <UserAvatar userImage={comment.authorImage} />
            </div>
          </div>
          <div className='group'>
            <div className='flex gap-2 items-center'>
              <div className=' font-medium  text-lg'>{comment.authorName}</div>
              <time className=' text-gray-400 text-sm'>
                {comment.createdAt === comment.updatedAt
                  ? format(comment.createdAt)
                  : `${format(comment.updatedAt || '')}(змінено) `}
              </time>

              <CommentsDropDownMenu
                setNewComment={setNewComment}
                setCommentId={setCommentId}
                comment={comment}
                postId={post.id}
                i={i}
              />
            </div>
            {comment.id !== commentId ? (
              <p
                className={` bg-gray-100 px-4 py-3 rounded-xl text-black/80 shadow-md  mt-1 break-all`}
              >
                {comment.id !== newCommentId && comment.content.length > 200
                  ? comment.content.slice(0, 214) + ' ...'
                  : comment.content}
                <br></br>

                {comment.id !== newCommentId && comment.content.length > 200 ? (
                  <span
                    onClick={() => setNewCommentId(comment.id)}
                    className=' text-sm text-gray-600 font-bold hover:underline cursor-pointer'
                  >
                    {`Показати повністю`}
                  </span>
                ) : (
                  ''
                )}
              </p>
            ) : (
              <div>
                <form onSubmit={handleSubmit} className='flex flex-col '>
                  <textarea
                    maxLength={255}
                    rows={3}
                    cols={40}
                    className='p-2 mt-2 border-2 rounded-md  '
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className='flex  self-end mt-1'>
                    <button
                      data-tip='cancel'
                      className='tooltip p-1 rounded-full hover:bg-red-200 duration-200'
                      onClick={() => setCommentId('')}
                    >
                      <XMarkIcon className='h-6 w-6 text-gray-500 hover:text-red-500' />
                    </button>

                    {isPending ? (
                      <span className='loading loading-spinner text-gray-500 text-sm' />
                    ) : (
                      <button
                        data-tip='ok!'
                        disabled={comment.content === newComment}
                        className='tooltip p-1 rounded-full hover:bg-green-200 duration-200 disabled:opacity-50 '
                      >
                        <CheckIcon className='h-6 w-6 text-gray-500 hover:text-green-500 ' />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
