import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export const UserAvatar = ({ className, userImage }: { className?: string, userImage:string }) => {

  return (
    <Avatar className={`${className} h-11 w-11 mr-4`}>
      <AvatarImage src={userImage} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
