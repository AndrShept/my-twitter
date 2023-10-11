import { PostBlock } from '@/components/PostBlock';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: { likes: { some: { authorId: params.id } } },
    include: {
      comments: true,
      favoritePosts: true,
      likes: true,
      _count: { select: { comments: true, favoritePosts: true, likes: true } },
    },
  });
  return (
    <section>
      {!posts.length && (
        <div className='p-2 space-y-2'>
          <h1 className=' font-semibold text-xl'>
            You don’t have any likes yet
          </h1>
          <span className='text-muted-foreground text-sm '>
            Tap the heart on any post to show it some love. When you do, it’ll
            show up here.
          </span>
        </div>
      )}
      {!!posts.length && (
        <>
          {posts.map((post) => (
            <PostBlock
              favoritePost={post.favoritePosts}
              key={post.id}
              post={post}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default page;
