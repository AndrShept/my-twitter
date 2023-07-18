'use client';
import React from 'react';
import { HomeIcon } from "@heroicons/react/20/solid";
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
import { usePathname } from 'next/navigation';

const menuList = [
  { path: '/', name: 'Home', icon: <HomeIcon className='h-7' /> },
  {
    path: '/explore',
    name: 'Explore',
    icon: <HashtagIcon className='h-7 w-7' />,
  },
  { path: '#', name: 'Notification', icon: <BellIcon className='h-7' /> },
  { path: '#', name: 'Messages', icon: <InboxIcon className='h-7' /> },
  { path: '#', name: 'Bookmarks', icon: <BookmarkIcon className='h-7' /> },
  { path: '#', name: 'Lists', icon: <ClipboardIcon className='h-7' /> },
  { path: '#', name: 'Profile', icon: <UserIcon className='h-7' /> },
  { path: '#', name: 'More', icon: <EllipsisHorizontalIcon className='h-7' /> },
];

export const SidebarMenuItem = ({ authProtectNum = -1 }) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-0 xl:gap-1'>
      {menuList.slice(0, authProtectNum).map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            className={`hoverEffect flex items-center px-4  text-gray-700  xl:justify-start justify-center text-lg rounded-full space-x-3 ${
              isActive && ''
            }`}
            key={item.name}
            href={item.path}
          >
            {item.icon}
            <span className={` ${isActive && 'font-bold '} hidden xl:inline `}>
          
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
