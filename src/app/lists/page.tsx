import { PostBlock } from '@/components/PostBlock';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { BackArrow } from '@/components/BackArrow';
import { StickyHeader } from '@/components/StickyHeader';

const page = async () => {
  const session = await getServerSession(authOptions);
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: { authorId: session?.user.id },
    include: {
      comments: true,
      likes: true,
      _count: { select: { comments: true, likes: true } },
    },
  });
  const favoritePost = await prisma.favoritePost.findMany({
    where: { userId: session?.user.id },
  });

  if (!session) {
    redirect('/');
  }

  return (
    <section className='border border-border'>
      <StickyHeader
        pagename='My Posts'
        username={
          session.user.username || `@${session.user.name!.replace(' ', '')}`
        }
      />
      {posts.length === 0 && (
        <h2 className='text-muted-foreground text-center text-xl mt-10'>
          I dont have any posts
        </h2>
      )}
      {posts.map((post) => (
        <PostBlock key={post.id} post={post} favoritePost={favoritePost} />
      ))}
    </section>
  );
};

export default page;
