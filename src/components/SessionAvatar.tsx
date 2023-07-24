import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export const SessionAvatar = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  return (
    <Image
    priority
      className={clsx(
        ' rounded-full w-12 h-12 mr-2  object-cover  ', className)
      }
      height={600}
      width={600}
      alt='avatar_img'
      src={session?.user.image! || `https://images.unsplash.com/photo-1682628890978-1d825f195f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80`}
    />
  );
};
