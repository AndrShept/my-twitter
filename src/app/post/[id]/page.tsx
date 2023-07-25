import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PostWithLikes } from '@/components/Feed';
import { PostComments } from '@/components/PostComments';
import { UserAvatar } from '@/components/UserAvatar';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
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
    <>
      <div className='flex py-2 px-3 sticky top-0 z-50  min-w-[350px] bg-white border-b border-gray-200'>
        <div className=' flex items-center justify-center   w-9 h-9 ml-2'>
          <Link  href='/'>
            <ArrowUturnLeftIcon className='h-10 w-10 text-gray-500 iconHoverEffect' />
          </Link>
          <h2 className='text-base sm:text-xl font-bold ml-1'>
            back
          </h2>
        </div>
      </div>

      <PostComments post={post} />
    </>
  );
};
export default PostPageById;
