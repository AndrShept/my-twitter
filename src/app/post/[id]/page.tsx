import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PostWithLikes } from '@/components/Feed';
import { PostComments } from '@/components/PostComments';
import { UserAvatar } from '@/components/UserAvatar';
import {
  ArrowSmallLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { format } from 'timeago.js';

export const getPostById = async (postId: string) => {
  try {
    const res = await fetch('http://localhost:3000/api/posts/' + postId);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const PostPageById = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const post: PostWithLikes = await getPostById(params.id);

  return (
    <div className='border border-border'>
      <div className='flex py-2 px-7  sticky top-0 z-50  min-w-[300px] bg-background  border-b border-border'>
        <div className=' flex items-center justify-center   w-9 h-9 ml-2'>
          <Link href='/'>
            <ArrowSmallLeftIcon className='h-10 w-10 text-muted-foreground hover:bg-secondary/50 p-2 rounded-full transition cursor-pointer' />
          </Link>
          <h2 className='text-base sm:text-xl font-bold ml-1'>Home</h2>
        </div>
      </div>
      <div className='flex p-3  border-b border-border bg-secondary/20  '>
        <UserAvatar userImage={post.authorImage} />
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
          {/* post text */}
          <p className='text-muted-foreground text-[15px] sm:text-[16px] mb-2'>
            {post.content}
          </p>
          {/* <div className='mr-2 sm:h-72 h-60 group overflow-hidden rounded-xl'> */}
   
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
