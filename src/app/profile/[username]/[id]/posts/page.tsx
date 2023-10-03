import { PostBlock } from '@/components/PostBlock';
import { prisma } from '@/lib/db/prisma';
import { Heading1 } from 'lucide-react';
import React from 'react';

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: { authorId: params.id },
    include: {
      comments: true,
      favoritePosts: true,
      likes: true,
      _count: { select: { comments: true, favoritePosts: true, likes: true } },
    },
  });

  return (
    <div>
      {posts.map((post) => (
        <PostBlock
          key={post.id}
          post={post}
          favoritePost={post.favoritePosts}
        />
      ))}
      {!posts.length && (
        <h1 className='text-muted-foreground font-semibold text-xl'>
          The user has no posts :(
        </h1>
      )}
    </div>
  );
};

export default page;
