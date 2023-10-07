'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from '../Modal';
import { useSession } from 'next-auth/react';
import { ConfirmModal } from '../ConfirmModal';

export const DeletePostIcon = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      startTransition(async () => {
        const res = await fetch(`api/posts/` + postId, {
          method: 'DELETE',
        });

        if (res.ok) {
          toast.success('success delete');
          router.refresh();
          setIsShowModal(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      data-tip='delete'
      className='tooltip  p-2 rounded-full transition hover:text-red-500 cursor-pointer hover:bg-secondary flex items-center justify-center '
    >
      <TrashIcon
        onClick={() => {
          setIsShowModal((prev) => !prev);
        }}
        className='h-5 w-5 active:scale-110    '
      />
      {isShowModal && session && (
        <ConfirmModal
          handleDeletePost={handleDeletePost}
          isPending={isPending}
          setIsShowModal={setIsShowModal}
          confirmText=' Are you sure you want to delete this post?  '
        />
      )}
    </div>
  );
};
