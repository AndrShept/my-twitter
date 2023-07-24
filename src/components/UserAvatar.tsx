import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

export const UserAvatar = ({ className, userImage }: { className?: string, userImage:string }) => {

  return (
    <Image
    priority
      className={clsx(
        ' rounded-full w-12 h-12 mr-8  object-cover cursor-pointer hover:brightness-95 duration-200  ', className)
      }
      height={600}
      width={600}
      alt='avatar_img'
      src={userImage}
    />
  );
};
