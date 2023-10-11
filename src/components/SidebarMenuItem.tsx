'use client';
import React from 'react';
import { HomeIcon } from '@heroicons/react/20/solid';
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const menuList = [
  { path: '/', name: 'Home', Icon: HomeIcon },
  {
    path: '#',
    name: 'Explore',
    Icon: HashtagIcon,
  },
  { path: '#', name: 'Notification', Icon: BellIcon },
  { path: '#', name: 'Messages', Icon: InboxIcon },
  { path: '/bookmarks', name: 'Bookmarks', Icon: BookmarkIcon },
  { path: '/lists', name: 'Lists', Icon: ClipboardIcon },
  { path: '/profile', name: 'Profile', Icon: UserIcon },
  // {
  //   path: '#',
  //   name: 'More',
  //   Icon: EllipsisHorizontalIcon,
  // },
];

export const SidebarMenuItem = ({ authProtectNum = menuList.length }) => {
  const router = useRouter()
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className='flex flex-col gap-1 xl:items-start items-center'>
      {menuList.slice(0, authProtectNum).map((item) => {
        const selfPathnameProfile = `${item.path}/${session?.user.name?.replace(
          ' ',
          ''
        )}/${session?.user.id}`;
        const isActive =
          pathname ===
          (item.name === 'Profile' ? selfPathnameProfile : item.path);
        return (
          <div
            className={cn(
              'xl:px-5 xl:py-3 p-[10px] xl:w-auto xl:h-auto h-12 w-12 cursor-pointer   flex items-center hover:bg-secondary/30  text-muted-foreground text-lg rounded-full',
              {
                'bg-secondary hover:bg-secondary font-semibold text-primary':
                  isActive,
              }
            )}
            key={item.name}
            onClick={()=> {router.push(`${item.name === 'Profile' ? selfPathnameProfile : item.path}`,{scroll:false}); router.refresh()}}
            // href={item.name === 'Profile' ? selfPathnameProfile : item.path}
          >
            <item.Icon className='xl:h-[25px] xl:w-[25px]  ' />

            <span className='text-base hidden xl:inline ml-2'>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
