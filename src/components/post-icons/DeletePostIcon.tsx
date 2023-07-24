'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from '../Modal';

export const DeletePostIcon = ({ postId }: { postId: string }) => {
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
      className='tooltip  iconHoverEffect hover:bg-red-100 flex items-center justify-center '
    >
      <TrashIcon
        onClick={() => {
          setIsShowModal((prev) => !prev);
        }}
        className='h-5 w-5 text-gray-500 active:scale-110   hover:text-red-600 duration-300    '
      />
      {isShowModal && (
        <Modal>
          <div className='flex flex-col p-8 max-w-xl min-w-[400px]  gap-10 bg-base-100 shadow-md rounded-xl animate-in fade-in-0 zoom-in-90 duration-300'>
            <h1 className='text-3xl  font-bold text-black text-left'>
              Ви дійсно хочете видалити цей пост?
            </h1>

            <div className='flex gap-3 self-end'>
              <div
                onClick={() => setIsShowModal(false)}
                className='btn btn-outline'
              >
                Cancel
              </div>
              <div onClick={handleDeletePost} className='btn btn-neutral w-28'>
                {isPending ? (
                  <span className='loading loading-spinner text-gray-300' />
                ) : (
                  'Continue'
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
