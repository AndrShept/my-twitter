import React from 'react';
import { Modal } from './Modal';

interface ConfirmModalProps {
  confirmText: string;
  isPending: boolean;
  setIsShowModal: (bool: boolean) => void;
  handleDeletePost: () => void;
}

export const ConfirmModal = ({
  confirmText,
  setIsShowModal,
  isPending,
  handleDeletePost,
}: ConfirmModalProps) => {
  return (
    <Modal>
      <div className='flex flex-col p-8 max-w-xl min-w-[400px] border border-border  gap-10 bg-base-100 shadow-md rounded-xl animate-in fade-in-0 zoom-in-90 duration-300'>
        <h1 className='text-xl  font-bold text-black text-left'>
          {confirmText}
        </h1>

        <div className='flex gap-3 self-end'>
          <button
            onClick={() => setIsShowModal(false)}
            className='  capitalize px-[14px] py-[10px] rounded-lg border text-sm hover:bg-secondary/40 font-medium duration-200'
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={handleDeletePost}
            className=' btn-neutral w-28 capitalize text-primary disabled:opacity-50 px-[14px] py-[10px] text-sm rounded-lg flex items-center justify-center'
          >
            {isPending ? (
              <span className='loading loading-spinner text-muted-foreground  ' />
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
