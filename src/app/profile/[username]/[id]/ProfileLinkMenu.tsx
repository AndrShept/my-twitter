'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const ProfileLinkMenu = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const pathname = usePathname();
  const userPath = `/profile/${username}/${userId}`;

  const linkList = [
    {
      id: 1,
      name: 'Posts',
      path: `${userPath}/posts`,
    },

    {
      id: 3,
      name: 'Following',
      path: `${userPath}/following`,
    },
    {
      id: 4,
      name: 'Followers',
      path: `${userPath}/followers`,
    },
    {
      id: 5,
      name: 'Likes',
      path: `${userPath}/likes`,
    },
    {
      id: 2,
      name: 'Replies',
      path: `${userPath}/with_replies`,
    },
  ];
  return (
    <>
      {linkList.map((link) => (
        <Link
          scroll={false}
          href={link.path}
          className='cursor-pointer    sm:pt-4 sm:px-4 pt-3 px-2 sm:text-base text-sm text-center col-span-1 text-muted-foreground hover:bg-secondary/30  '
          key={link.id}
        >
          <li
            className={cn('border-b-[3px] sm:pb-4 pb-3 border-transparent', {
              'border-border text-primary font-semibold':
                pathname === link.path,
            })}
          >
            {link.name}
          </li>
        </Link>
      ))}
    </>
  );
};
