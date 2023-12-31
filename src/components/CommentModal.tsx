'use client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { format } from 'timeago.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserAvatar } from './UserAvatar';
import { Modal } from './Modal';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Comment, Like, Post } from '@prisma/client';
import { X } from 'lucide-react';
import { EmojiIcon } from './EmojiIcon';

export const CommentModal = ({
  post,
  setIsModalOpen,
}: {
  post: Post & { comments: Comment[] } & { likes: Like[] };
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      comment,
      postId: post.id,
    };

    startTransition(async () => {
      const res = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res) {
        setIsModalOpen(false);
        router.refresh();
        router.push('/post/' + post.id);
      }
    });
  };
  return (
    <Modal>
      <div className='md:min-w-[500px] w-[500px] rounded-lg   bg-background after:rounded-xl border-2 border-border shadow-lg flex flex-col px-6 py-3 animate-in fade-in-0 zoom-in-90 duration-300 '>
        <Button
          onClick={() => setIsModalOpen(false)}
          variant={'ghost'}
          size={'icon'}
          className='rounded-full ml-auto  '
        >
          <X />
        </Button>
        <div className=' flex border-y py-4 mt-2 '>
          <div>
            <UserAvatar
              userId={post.authorId}
              userName={post.authorName}
              userImage={post.authorImage}
            />
          </div>
          <div className='flex  flex-col text-left  items-start  w-full justify-between '>
            <div className='flex  items-center justify-between gap-1'>
              <h4 className='font-bold text-primary text-[15px] sm:text-[16px] hover:underline'>
                {post.authorName}
              </h4>
              <span className='text-sm sm:text-[15px]'>
                {post.authorUserName}
              </span>
              <span className='text-sm sm:text-[14px] hover:underline text-muted-foreground/60 '>
                {format(post.createdAt)}
              </span>
            </div>
            <p className='text-primary text-[14px] sm:text-[15px] break-all '>
              {post.content}
            </p>
          </div>
        </div>
        <div className='flex mt-9 gap-x-4 justify-between'>
          {/* <div className='h-11 w-11 relative'>
            <Image
              className='rounded-full  object-cover   '
              fill
              alt='avatar_img'
              src={session?.user.image }
            />
          </div> */}
          <form
            className='flex flex-col w-[100%]  min-h-[50px] '
            onSubmit={handleChange}
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              name='text'
              className=' border-b text-[15px] text-primary    '
              rows={4}
              placeholder='comment...'
            />
            <div className='flex  mt-4 justify-between py-1'>
              <EmojiIcon
                content={comment}
                setContent={setComment}
                className='scale-90  -top-8'
              />
              <Button className=' rounded-full w-20  shadow-md  self-end '>
                {isPending ? (
                  <span className='loading loading-spinner  text-muted-foreground' />
                ) : (
                  `Reply`
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
