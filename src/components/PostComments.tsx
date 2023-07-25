'use client';
import React, { useState, useRef } from 'react';
import { UserAvatar } from './UserAvatar';
import { format } from 'timeago.js';
import { PostWithLikes } from './Feed';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { DeleteIcon } from './comments-icons/DeleteIcon';
import { EditIcon } from './comments-icons/EditIcon';
import { useClickAway } from 'react-use';

export const PostComments = ({ post }: { post: PostWithLikes }) => {
  const [isShowCommentMenu, setIsShowCommentMenu] = useState(false);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useClickAway(ref, () => {
    if (isShowCommentMenu) {
      setIsShowCommentMenu(false);
    }
  });
  return (
    <>
      {post.comments.map((comment, i) => (
        <div  className='chat chat-start gap-4 mt-4' key={comment.id}>
          <div className='chat-image avatar self-start '>
            <div className='w-10 rounded-full mt-2'>
              <UserAvatar userImage={comment.authorImage} />
            </div>
          </div>
          <div className='group'>
            <div className='flex gap-2 items-center'>
              <div className=' font-medium  text-lg'>{comment.authorName}</div>
              <time className=' text-gray-400 text-sm'>
                {format(comment.createdAt)}
              </time>
              <div className='chat-footer opacity-50'>delivered</div>
              <div className='h-10 w-10 '>
                <EllipsisHorizontalIcon
                  onClick={() => {
                    setIndex(i);
                    setIsShowCommentMenu((prev) => !prev);
                  }}
                  className={clsx(
                    `group-hover:block  cursor-pointer iconHoverEffect   rounded-full `,
                    {
                      hidden: !isShowCommentMenu,
                    }
                  )}
                />
                {i === index && isShowCommentMenu && (
                  <div ref={ref} className='absolute mt-1 text-sm flex flex-col w-44  p-2  bg-base-100 rounded-md gap-1 shadow-md border animate-in fade-in-0 zoom-in-90 duration-200'>
                    <EditIcon />
                    <DeleteIcon
                      commentId={comment.id}
                      postId={post.id}
                      isShowCommentMenu={isShowCommentMenu}
                      setIsShowCommentMenu={setIsShowCommentMenu}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className=' bg-gray-100 px-4 py-3 rounded-xl text-black/80 shadow-md  mt-1  '>
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
