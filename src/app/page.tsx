import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { PostBlock } from '@/components/PostBlock';
import { Input } from '@/components/MainPostInput';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      comments: true,
      likes: true,
      _count: { select: { comments: true, likes: true } },
    },
  });

  const favoritePost = await prisma.favoritePost.findMany({
    where: { userId: session?.user.id },
  });
  return (
    <div className=' border-l border-r border-border bg-secondary/20  '>
      <div className='flex py-2 px-3 sticky top-0 z-10 bg-background  border-b border-border'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
          <SparklesIcon className='h-5 text-muted-foreground' />
        </div>
      </div>

      {session && <Input session={session!} />}

      {posts.map((post) => (
        <PostBlock key={post.id} post={post} favoritePost={favoritePost} />
      ))}
    </div>
  );
};

export default Home
