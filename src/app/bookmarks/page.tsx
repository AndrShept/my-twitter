import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { BackArrow } from '@/components/BackArrow';
import { prisma } from '@/lib/db/prisma';
import { PostBlock } from '@/components/PostBlock';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  const favoritePost = await prisma.favoritePost.findMany({
    orderBy: { createdAt: 'asc' },
    where: { userId: session?.user.id },
  });
  const posts = await prisma.post.findMany({
    where: { id: { in: favoritePost.map((item) => item.postId) } },
    orderBy: {createdAt:'desc'},

    include: {
     
      comments: true,
      likes: true,
      _count: { select: { comments: true, likes: true } },
    },
  });


  // if (!session) {
  // return
  // }
  return (
    <section className='border border-border min-h-full  '>
      <div className='sticky mb-2 top-0 z-50 p-2 flex items-center bg-background/80 gap-2 border-b border-border backdrop-blur-md '>
        <div className=' flex items-center justify-center  '>
          <BackArrow />
        </div>
        <div>
          <h2 className='text-xl text-primary font-semibold leading-none'>
            Bookmarks
          </h2>
          <span className='text-muted-foreground text-base'>
            {session?.user.username}
          </span>
        </div>
      </div>
      {posts.length === 0 ? (
        <div className=' pt-24 flex mx-auto flex-col text-center gap-2'>
          <h1 className='md:text-4xl text-3xl font-bold '>
            Save posts for later
          </h1>
          <span className='text-muted-foreground'>
            Bookmark posts to easily find them again in the future.
          </span>
        </div>
      ) : (
        posts.map((post) => (
          <PostBlock key={post.id} post={post} favoritePost={favoritePost} />
        ))
      )}
    </section>
  );
};

export default page;
