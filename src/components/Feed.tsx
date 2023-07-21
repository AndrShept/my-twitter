import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { PostBlock } from './PostBlock';
import { Input } from './Input';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Like, Post } from '@prisma/client';


export type PostWithLikes = Post & { like: Like[] };

export const getPosts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      next:{revalidate: 10}
   
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const Feed = async () => {

  const posts: PostWithLikes[] = await getPosts();

  const session = await getServerSession(authOptions);

  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] max-w-xl bg-white '>
      <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
          <SparklesIcon className='h-5' />
        </div>
      </div>

      {session && <Input session={session!} />}
      {posts.map((post) => (
        <PostBlock key={post.id} post={post} />
      ))}
    </div>
  );
};
