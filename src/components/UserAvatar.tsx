import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TooltipUserInfo } from './TooltipUserInfo';

export const UserAvatar = ({
  className,
  userImage,
  userId,
  userName,
}: {
  className?: string;
  userImage: string;
  userId: string;
  userName: string;
}) => {
  return (
    <Link className='hover:opacity-90 ' href={`/profile/${userName}/${userId}`}>
      <Avatar className={cn('md:h-12 md:w-12  mr-4 ', className)}>
        {/* <TooltipUserInfo userId={userId}> */}
        <AvatarImage className='object-cover' src={userImage} alt='@shadcn' />
        {/* </TooltipUserInfo> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};
