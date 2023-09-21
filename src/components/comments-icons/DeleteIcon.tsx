import { API_URL } from '@/lib/utils/baseUrl';
import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useState, useTransition } from 'react';
import { ConfirmModal } from '../ConfirmModal';
import { useRouter } from 'next/navigation';

interface DeleteIconProps {
  commentId: string;
  postId: string;
}

export const DeleteIcon = ({ commentId, postId }: DeleteIconProps) => {
  const [isPending, startTransition] = useTransition();
  const [isShowModal, setIsShowModal] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      startTransition(async () => {
        const res = await fetch(`${API_URL}comments/${commentId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setIsShowModal(false);

          router.refresh();

          router.push(postId);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsShowModal(true)}
        className='flex gap-2 items-center cursor-pointer hover:bg-secondary/40 py-2 duration-200  rounded-md'
      >
        <span className='ml-3'>
          <TrashIcon className='h-5 w-5 text-muted-foreground' />
        </span>
        <span>Delete</span>
      </div>
      {isShowModal && (
        <ConfirmModal
          confirmText='Ви дійсно хочете видалити цей коментарій ?'
          handleDeletePost={handleClick}
          setIsShowModal={setIsShowModal}
          isPending={isPending}
        />
      )}
    </>
  );
};
