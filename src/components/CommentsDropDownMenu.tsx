import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { DeleteIcon } from './comments-icons/DeleteIcon';
import clsx from 'clsx';
import { Comment } from '@prisma/client';
import { Button } from './ui/button';

interface CommentsDropDownMenuProps {
  setNewComment: (str: string) => void;
  setCommentId: (str: string) => void;
  comment: Comment;
  postId: string;
  i: number;
}

export const CommentsDropDownMenu = ({
  setNewComment,
  setCommentId,
  comment,
  postId,
  i,
}: CommentsDropDownMenuProps) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const { data: session } = useSession();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
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
      <div className='h-10 w-10 '>
        {session && session.user.id === comment.authorId && (
          <Button variant={'ghost'} size={'icon'} className='rounded-full'>
            <EllipsisHorizontalIcon
              onClick={() => {
                setIndex(i);
                setIsShowDropdownMenu((prev) => !prev);
              }}
              className={clsx(
                `group-hover:block  cursor-pointer p-2  transition   rounded-full `,
                {
                  hidden: !isShowDropdownMenu,
                }
              )}
            />
          </Button>
        )}
        {i === index && isShowDropdownMenu && (
          <div
            ref={ref}
            className='absolute z-10 -mt-[123px] ml-4 text-sm flex flex-col w-32   bg-background rounded-md gap-1 shadow-md border animate-in fade-in-0 zoom-in-90 duration-200'
          >
            <div
              onClick={() => handleEditClick(comment.content, comment.id)}
              className='flex gap-2 items-center cursor-pointer hover:bg-secondary/40 py-2 duration-200  rounded-md'
            >
              <span className='ml-3'>
                <PencilSquareIcon className='h-5 w-5 text-muted-foreground' />
              </span>
              <span>Edit</span>
            </div>
            <DeleteIcon commentId={comment.id} postId={postId} />
          </div>
        )}
      </div>
    </>
  );
};
