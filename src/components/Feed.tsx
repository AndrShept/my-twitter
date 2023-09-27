import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { PostBlock } from './PostBlock';
import { Input } from './Input';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

export const Feed = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      comments: true,
      likes: true,
      _count: { select: { comments: true, likes: true } },
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <div className=' border-l border-r border-border bg-secondary/20  '>
      <div className='flex py-2 px-3 sticky top-0 z-50 bg-background  border-b border-border'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
          <SparklesIcon className='h-5 text-muted-foreground' />
        </div>
      </div>

      {session && <Input session={session!} />}

      {posts.map((post) => (
        <PostBlock key={post.id} post={post} />
      ))}
    </div>
  );
};
