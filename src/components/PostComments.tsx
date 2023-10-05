'use client';
import React, { useState, useTransition } from 'react';
import { UserAvatar } from './UserAvatar';
import { format } from 'timeago.js';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { CommentsDropDownMenu } from './CommentsDropDownMenu';
import { Textarea } from './ui/textarea';
import { Comment } from '@prisma/client';
import { CommentsInput } from './CommentsInput';
import { useSession } from 'next-auth/react';
import { CommentsFilter } from './CommentsFilter';
import { motion, AnimatePresence } from 'framer-motion';

export const PostComments = ({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: string;
}) => {
  const [newComment, setNewComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();
  const [position, setPosition] = React.useState('desc');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      startTransition(async () => {
        const res = await fetch(`/api/comments/${commentId}`, {
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


  comments.sort((a: any, b: any) =>
    position === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
  );
  return (
    <section className='relative min-h-[500px] '>
      {comments.length > 0 && (
        <div className='text-right px-5 mt-2'>
          <CommentsFilter position={position} setPosition={setPosition} />
        </div>
      )}
      {session && <CommentsInput postId={postId} />}
      {!comments.length && (
        <h1 className='text-muted-foreground text-center text-2xl mt-10 min-h-[400px]'>
          No comments
        </h1>
      )}
      <AnimatePresence initial={false}>
        {comments.map((comment, i) => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className='group flex items-center  w-full hover:bg-secondary/30 text-sm  py-2'
            key={comment.id}
          >
            <div className='flex gap-4 px-3 py-2 items-start'>
              <UserAvatar
                className='mr-0 mt-3'
                userId={comment.authorId}
                userName={comment.authorName}
                userImage={comment.authorImage}
              />

              <div>
                <div className='flex space-x-2 items-center '>
                  <h2 className=' font-medium  text-base  '>
                    {comment.authorName}
                  </h2>
                  <span className=' text-muted-foreground text-sm'>
                    {format(comment.createdAt) === format(comment.updatedAt!) &&
                      format(comment.createdAt)}
                    {format(comment.createdAt) !== format(comment.updatedAt!) &&
                      `${format(comment.updatedAt || '')} (updated) `}
                  </span>
                  <CommentsDropDownMenu
                    setNewComment={setNewComment}
                    setCommentId={setCommentId}
                    comment={comment}
                    postId={postId}
                    i={i}
                  />
                </div>

                {comment.id !== commentId ? (
                  <p className={`  text-primary/90  break-all`}>
                    {comment.content}
                  </p>
                ) : (
                  <div>
                    <form onSubmit={handleSubmit} className='flex flex-col '>
                      <Textarea
                        maxLength={255}
                        rows={3}
                        cols={40}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className='flex  self-end mt-2'>
                        <button
                          data-tip='cancel'
                          className='tooltip p-1 rounded-full hover:bg-secondary duration-200'
                          onClick={() => setCommentId('')}
                        >
                          <XMarkIcon className='h-6 w-6 text-red-500' />
                        </button>

                        {isPending ? (
                          <span className='loading loading-spinner text-primary text-sm' />
                        ) : (
                          <button
                            data-tip='ok!'
                            disabled={comment.content === newComment}
                            className='tooltip p-1 rounded-full hover:bg-secondary duration-200 disabled:opacity-50 '
                          >
                            <CheckIcon className='h-6 w-6 text-green-600 ' />
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};
