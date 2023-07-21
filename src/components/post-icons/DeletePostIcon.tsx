'use client'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-hot-toast';

export const DeletePostIcon = ({postId}:{postId: string}) => {
  const router = useRouter()

    const handleDeletePost = async () => {
    try {
      const res = await fetch(`api/posts/` + postId, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('success delete');
        router.refresh()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
    data-tip='delete'
    className='tooltip  iconHoverEffect hover:bg-red-100 flex items-center justify-center '
  >
    <TrashIcon
      onClick={handleDeletePost}
      className='h-5 w-5 text-gray-500 active:scale-110   hover:text-red-600 duration-300    '
    />
  </div>
  )
}
