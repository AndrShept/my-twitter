import { BackArrow } from '@/components/BackArrow';
import { PostComments } from '@/components/PostComments';
import { UserAvatar } from '@/components/UserAvatar';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import React from 'react';
import { format } from 'timeago.js';

const PostPageById = async ({ params }: { params: { id: string } }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      comments: true,
      likes: true,
      _count: { select: { comments: true, likes: true } },
    },
  });
  if (!post) {
    return null;
  }
  return (
    <div className='border border-border'>
      <div className='flex p-2  sticky top-0 z-10 backdrop-blur-md   min-w-[300px] bg-background/80  border-b border-border'>
        <div className='flex items-center'>
          <BackArrow />
          <h2 className='text-base sm:text-xl font-bold ml-1'>Home</h2>
        </div>
      </div>
      <div className='flex p-3  border-b border-border bg-secondary/20  '>
        <UserAvatar
          userId={post.authorId}
          userName={post.authorName || post.authorUserName}
          userImage={post.authorImage}
        />
        <div>
          {/* post user info */}
          <div className='flex items-center space-x-1 whitespace-nowrap w-full justify-between '>
            <div className='flex  items-center justify-between gap-1'>
              <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
                {post.authorName}
              </h4>
              <span className='text-sm sm:text-[15px] text-muted-foreground'>
                {post.authorUserName}
              </span>
              <span className='text-sm sm:text-[14px] hover:underline text-muted-foreground/50 '>
                {format(post.createdAt)}
              </span>
            </div>
          </div>
          <p className='text-muted-foreground text-[15px] sm:text-[16px] mb-2'>
            {post.content}
          </p>

          <Image
            height={500}
            width={500}
            alt='post_image'
            src={post.image!}
            className='rounded-xl  object-cover mr-2 '
          />
        </div>
      </div>
      <PostComments comments={post.comments} postId={post.id} />
    </div>
  );
};
export default PostPageById;
