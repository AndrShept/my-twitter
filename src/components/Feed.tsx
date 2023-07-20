import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { PostBlock } from './PostBlock';
import { Input } from './Input';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Post } from '@prisma/client';

export const getPosts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      next: { revalidate: 10 },
    });
    
    return res.json()
  } catch (error) {
    console.log(error);
  }
};

export const Feed = async () => {
  const posts: Post[] = await getPosts();
  const session = await getServerSession(authOptions);
  const postsOld = [
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1688155569801-ea29427347f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80',
      authorImage:
        'https://images.unsplash.com/photo-1686041607888-78b4d624ed6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      title: 'William tours plane that brought',
      content:
        'Prince William and his family have toured the plane that carried the Queens coffin back to London',
      published: true,
      authorId: '1',

      username: 'John Doe',
      createdAt: '3 days ago',
    },
    {
      id: '2',
      image:
        'https://images.unsplash.com/photo-1688921814463-bfcb296938be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      authorImage:
        'https://images.unsplash.com/photo-1684880868860-5acfa16e44bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      title: 'Fuel Subsidy: House of Reps approves Tinubu',
      content:
        'The House of Representatives on Thursday approved President Bola Tinubu’s N500 billion palliative fund to cushion the effect of the removal of fuel subsidy.',
      published: true,
      authorId: '2',
      username: 'Jane Smith',
      createdAt: '5 days ago',
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1665101810704-4e56e58143fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      authorImage:
        'https://images.unsplash.com/photo-1687152271729-3c06eb808e7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      title: 'Leipzig sign Lois Openda from RC Lens',
      content:
        'The Belgian player signed a contract until June 2028 and is expected to replace Christopher Nkunku, who moved to Chelsea.',
      published: true,
      authorId: '1',
      username: 'Emmy White',
      createdAt: '2 days ago',
    },
    {
      id: '4',
      image:
        'https://images.unsplash.com/photo-1571678348855-32ee2bfcea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80',
      authorImage:
        'https://images.unsplash.com/photo-1685655507979-213c91079365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      title: 'Liverpool given major boost',
      content:
        'The majority of the Premier League’s big names have been linked with Lavia. It’s not often a player shines so brightly on their first season of top-flight football that happens.',
      published: true,
      authorId: '3',
      username: 'Alice Johnson',
      createdAt: '1 days ago',
    },
  ];

  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] max-w-xl bg-white '>
      <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
          <SparklesIcon className='h-5' />
        </div>
      </div>

      {session && <Input session={session!} />}
      {posts.map((post) => (
        <PostBlock key={post.id} post={post} />
      ))}
    </div>
  );
};
