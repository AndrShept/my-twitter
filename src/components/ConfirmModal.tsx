import React from 'react';
import { Modal } from './Modal';
import { Button } from './ui/button';

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
      <div className='flex flex-col p-8 max-w-xl min-w-[400px] border border-border bg-background  gap-10  shadow-md rounded-xl animate-in fade-in-0 zoom-in-90 duration-300'>
        <h1 className='text-xl  font-bold text-primary text-left'>
          {confirmText}
        </h1>

        <div className='flex gap-3 self-end '>
          <Button
          variant={'outline'}
            onClick={() => setIsShowModal(false)}
            className='  '
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleDeletePost}
            className=' '
          >
            {isPending ? (
              <span className='loading loading-spinner text-secondary  ' />
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
