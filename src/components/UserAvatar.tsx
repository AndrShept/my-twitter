import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const UserAvatar = ({
  className,
  userImage,
  userId,
  userName,
}: {
  className?: string;
  userImage: string;
  userId: string
  userName: string
}) => {
  return (
    <Link href={`/profile/${userName}/${userId}`}>
        <Avatar className={cn('h-12 w-12 mr-4 ', className)}>
      <AvatarImage className='object-cover'  src={userImage} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </Link>

  );
};
