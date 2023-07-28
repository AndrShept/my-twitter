'use client';
import React, { useState, useRef, useTransition } from 'react';
import { UserAvatar } from './UserAvatar';
import { format } from 'timeago.js';
import { PostWithLikes } from './Feed';
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { DeleteIcon } from './comments-icons/DeleteIcon';
import clsx from 'clsx';
import { useClickAway } from 'react-use';
import { API_URL } from '@/lib/utils/baseUrl';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const PostComments = ({ post }: { post: PostWithLikes }) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [isShowAllComments, setIsShowAllComments] = useState(200);

  const [isPending, startTransition] = useTransition();
  const ref = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

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

  const handleClickMoreComments = (i: number) => {
    
    
    console.log(i, 'i');
    console.log(index, 'index');

    if (index === i) {
      setIsShowAllComments(1000);
    }
  };

  // const handleClickMoreComments = (i:number) => {

  //   setIndex(i)
  //   if ( i === index) {
  //     setIsShowAllComments(1000);
  //   }
  //   console.log(isShowAllComments)
  // };

  const handleEditClick = (comment: string, commentId: string) => {
    setNewComment(comment);
    setCommentId(commentId);
    setIsShowDropdownMenu(false);
  };

  useClickAway(ref, () => {
    setIsShowDropdownMenu(false);
  });
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

              <div className='h-10 w-10 '>
                {session && session.user.id === comment.authorId && (
                  <EllipsisHorizontalIcon
                    onClick={() => {
                      setIndex(i);

                      setIsShowDropdownMenu((prev) => !prev);
                    }}
                    className={clsx(
                      `group-hover:block  cursor-pointer iconHoverEffect   rounded-full `,
                      {
                        hidden: !isShowDropdownMenu,
                      }
                    )}
                  />
                )}
                {i === index && isShowDropdownMenu && (
                  <div
                    ref={ref}
                    className='absolute mt-1 text-sm flex flex-col w-32  p-2  bg-base-100 rounded-md gap-1 shadow-md border animate-in fade-in-0 zoom-in-90 duration-200'
                  >
                    <div
                      onClick={() =>
                        handleEditClick(comment.content, comment.id)
                      }
                      className='flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 duration-200  rounded-md'
                    >
                      <span className='ml-3'>
                        <PencilSquareIcon className='h-5 w-5 text-gray-500' />
                      </span>
                      <span>Edit</span>
                    </div>

                    <DeleteIcon commentId={comment.id} postId={post.id} />
                  </div>
                )}
              </div>
            </div>
            {comment.id !== commentId ? (
              <>
                <p
                  className={` bg-gray-100 px-4 py-3 rounded-xl text-black/80 shadow-md  mt-1 break-all   `}
                >
                  {comment.content.slice(0, isShowAllComments)} <br></br>
                  {comment.content.length > 200 && index !== i && (
                    <span
                      onClick={() => handleClickMoreComments(i)}
                      className=' font-bold hover:underline cursor-pointer'
                    >
                      Докладніше...
                    </span>
                  )}
                </p>
              </>
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
