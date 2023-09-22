import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PostWithLikes } from '@/components/Feed';
import { PostComments } from '@/components/PostComments';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

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
    <div className='xl:p-0 sm:p-6 p-4'>
      <div className='flex py-2 px-3  sticky top-0 z-50  min-w-[300px] bg-background  border-b border-border'>
        <div className=' flex items-center justify-center   w-9 h-9 ml-2'>
          <Link href='/'>
            <ArrowSmallLeftIcon className='h-10 w-10 text-muted-foreground hover:bg-secondary/50 p-2 rounded-full transition cursor-pointer' />
          </Link>
          <h2 className='text-base sm:text-xl font-bold ml-1'>back</h2>
        </div>
      </div>
      <h1 className='text-center text-xl mt-2'>{post.content}</h1>
      <PostComments post={post} />
    </div>
  );
};
export default PostPageById;
