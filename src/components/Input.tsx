import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { TweetButton } from './TweetButton';
import { prisma } from '@/lib/db/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const addTweet = async (formData: FormData) => {
  'use server';
  const session = await getServerSession(authOptions);

  const text = formData.get('text')!.toString();
  // const file = formData.get('file')?.toString()

  await prisma.post.create({
    data: {
      content: text,
      authorName: session!.user.username,
      authorId: session!.user.id,
      authorImage: session!.user.image!,
      // image: file
      
     
    },
  });
};

export const Input = async ({ session }: { session: Session }) => {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
      <div className='w-[68px]'>
        <Image
          className='ml-2 rounded-full w-11 h-11 object-cover cursor-pointer hover:brightness-95 '
          height={400}
          width={400}
          alt='avatar_img'
          src={session?.user.image || ''}
        />
      </div>
      <form action={addTweet} className='w-full divide-y divide-gray-200'>
        <textarea
          required
          name='text'
          className=' w-full p-2  text-lg  placeholder-gray-400  tracking-wide min-h-[50px] text-gray-700'
          rows={2}
          placeholder='Whats happening'
        />

        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex'>
        <input name='file' type="file" />
            <FaceSmileIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
          </div>
          <TweetButton />
        </div>
      </form>
    </div>
  );
};
