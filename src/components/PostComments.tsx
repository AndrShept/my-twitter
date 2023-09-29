'use client';
import React, { useState, useTransition } from 'react';
import { UserAvatar } from './UserAvatar';
import { format } from 'timeago.js';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { API_URL } from '@/lib/utils/baseUrl';
import { useRouter } from 'next/navigation';
import { CommentsDropDownMenu } from './CommentsDropDownMenu';

import { Textarea } from './ui/textarea';
import { Comment } from '@prisma/client';

export const PostComments = ({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: string;
}) => {
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
  if (!comments.length) {
    return (
      <h1 className='text-muted-foreground text-center text-2xl mt-10 min-h-[400px]'>
        No comments
      </h1>
    );
  }

  return (
    <>
      {comments.map((comment, i) => (
        <div
          className='chat chat-start gap-4 mt-4 group w-full hover:bg-secondary/50 text-sm '
          key={comment.id}
        >
          <div className='flex gap-4 px-3 py-2 items-start'>
            <UserAvatar
              className='mr-0'
              userId={comment.authorId}
              userName={comment.authorName}
              userImage={comment.authorImage}
            />

            <div className=''>
              <div className='flex gap-2 items-start'>
                <div className='flex space-x-2 items-center'>
                  <h2 className=' font-medium  text-base '>
                    {comment.authorName}
                  </h2>
                  <time className=' text-muted-foreground text-sm'>
                    {comment.createdAt === comment.updatedAt
                      ? format(comment.createdAt)
                      : `${format(comment.updatedAt || '')}(змінено) `}
                  </time>
                  <CommentsDropDownMenu
                  setNewComment={setNewComment}
                  setCommentId={setCommentId}
                  comment={comment}
                  postId={postId}
                  i={i}
                />
                </div>


              </div>
              {comment.id !== commentId ? (
                <p className={`  text-primary/90  break-all`}>
                  {comment.id !== newCommentId && comment.content.length > 200
                    ? comment.content.slice(0, 214) + ' ...'
                    : comment.content}
                  <br></br>

                  {comment.id !== newCommentId &&
                  comment.content.length > 200 ? (
                    <span
                      onClick={() => setNewCommentId(comment.id)}
                      className=' text-sm text-primary font-bold hover:underline cursor-pointer'
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
                    <Textarea
                      maxLength={255}
                      rows={3}
                      cols={40}
                      className='   '
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className='flex  self-end mt-2'>
                      <button
                        data-tip='cancel'
                        className='tooltip p-1 rounded-full hover:bg-red-200 duration-200'
                        onClick={() => setCommentId('')}
                      >
                        <XMarkIcon className='h-6 w-6 text-muted-foreground hover:text-red-500' />
                      </button>

                      {isPending ? (
                        <span className='loading loading-spinner text-primary text-sm' />
                      ) : (
                        <button
                          data-tip='ok!'
                          disabled={comment.content === newComment}
                          className='tooltip p-1 rounded-full hover:bg-green-200 duration-200 disabled:opacity-50 '
                        >
                          <CheckIcon className='h-6 w-6 text-muted-foreground hover:text-green-500 ' />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
