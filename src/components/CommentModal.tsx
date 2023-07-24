'use client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { format } from 'timeago.js';
import { PostWithLikes } from './Feed';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export const CommentModal = ({
  post,
  setIsModalOpen,
}: {
  post: PostWithLikes;
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const router = useRouter()
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

    startTransition(async()=>{
      const res = await fetch(`api/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res){
        setIsModalOpen(false)
        router.refresh()
        router.push('post/'+post.id)

      }

    })
  };
  return (
    <section className='fixed p-4 inset-0 w-full h-full bg-white/50 backdrop-blur-sm z-50 flex  items-center justify-center animate-in fade-in-0 duration-300'>
      <div className='md:min-w-[500px] min-h-[400px]  bg-white rounded-xl border-2 border-gray-200 shadow-lg flex flex-col p-4 animate-in fade-in-0 zoom-in-90 duration-300 '>
        <div className=' border-b flex items-center justify-end  '>
          <span
            onClick={() => setIsModalOpen(false)}
            className='cursor-pointer px-[10px] duration-300 hover:bg-slate-100 rounded-full mb-2 text-lg'
          >
            x
          </span>
        </div>
        <div className=' flex mt-4'>
          <div className=' '>
            <Image
              width={500}
              height={500}
              className='h-11 w-11 object-cover rounded-full mr-12'
              alt='post_image '
              src={post.authorImage}
            />
          </div>
          <div className='flex flex-col  items-start space-x-1 whitespace-nowrap w-full justify-between '>
            <div className='flex  items-center justify-between gap-1'>
              <h4 className='font-bold text-black text-[15px] sm:text-[16px] hover:underline'>
                {post.authorName}
              </h4>
              <span className='text-sm sm:text-[15px]'>
                {post.authorUserName}
              </span>
              <span className='text-sm sm:text-[14px] hover:underline text-gray-400 '>
                {format(post.createdAt)}
              </span>
            </div>
            <p className='text-gray-800 text-[15px] sm:text-[16px] '>
              {post.content}
            </p>
          </div>
        </div>
        <div className='flex mt-16'>
          <Image
            className='rounded-full w-11 h-11 object-cover cursor-pointer hover:brightness-95 '
            height={400}
            width={400}
            alt='avatar_img'
            src={session?.user.image || ''}
          />
          <form
            className='flex flex-col min-h-[50px]  w-full'
            onSubmit={handleChange}
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              name='text'
              className=' p-2 ml-6 border-b  text-lg  focus:outline-none focus:ring-0  placeholder-gray-400  tracking-wide  text-gray-700'
              rows={4}
              placeholder='Whats happening'
            />
            <div className='self-end  mt-4'>
              <button className=' rounded-full w-20 duration-300 hover:bg-blue-400 bg-blue-500 text-white shadow-md px-4 py-2 self-end flex items-center justify-center'>
            { isPending? <span className='loading loading-spinner  text-gray-300'/> :   `Reply`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
