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

export const CommentModal = ({
  post,
  setIsModalOpen,
}: {
  post: Post & {comments: Comment[]} & {likes: Like[]};
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
      authorName: session?.user.username,
      authorImage: session?.user.image,
      authorId: session?.user.id,
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
      <div className='md:min-w-[500px] w-[500px]   bg-background after:rounded-xl border-2 border-border shadow-lg flex flex-col p-4 animate-in fade-in-0 zoom-in-90 duration-300 '>
        <div className=' border-b flex items-center justify-end  '>
          <span
            onClick={() => setIsModalOpen(false)}
            className='cursor-pointer px-[10px] duration-300 hover:bg-secondary/50 rounded-full mb-2 text-lg'
          >
            x
          </span>
        </div>
        <div className=' flex mt-4'>
          <div className=' '>
            <UserAvatar userId={post.id} userName={post.authorName} userImage={post.authorImage} />
          </div>
          <div className='flex flex-col  items-start space-x-1 whitespace-nowrap w-full justify-between '>
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
            <p className='text-muted text-[15px] sm:text-[16px] '>
              {post.content}
            </p>
          </div>
        </div>
        <div className='flex mt-16 gap-6'>
          <Image
            className='rounded-full w-11 h-11 object-cover   '
            height={400}
            width={400}
            alt='avatar_img'
            src={session?.user.image || ''}
          />
          <form
            className='flex flex-col  min-h-[50px]  w-full'
            onSubmit={handleChange}
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              name='text'
              className=' border-b   placeholder-text-muted-foreground   text-muted-foreground'
              rows={4}
              placeholder='Whats happening'
            />
            <div className='self-end  mt-4'>
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
