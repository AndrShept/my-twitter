import { Session } from 'next-auth';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const SessionAvatar = ({
  className,
  session,
}: {
  className?: string;
  session: Session 
}) => {
  return (
    <Avatar>
      <AvatarImage src={session.user.image!} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
