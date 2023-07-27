import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface EditIconProps {
  setIsEdit: (bool: boolean ) => void;
  setIsShowDropdownMenu: (bool: boolean) => void;
}

export const EditIcon = ({
  setIsEdit,

  setIsShowDropdownMenu,
}: EditIconProps) => {
  const handleClick = () => {
    setIsEdit(true);
    setIsShowDropdownMenu(false);
  };
  return (
    <div
      onClick={handleClick}
      className='flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-2 duration-200  rounded-md'
    >
      <span className='ml-3'>
        <PencilSquareIcon className='h-5 w-5 text-gray-500' />
      </span>
      <span>Edit</span>
    </div>
  );
};
