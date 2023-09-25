import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { News } from './News';
import { RandomFollowUsers } from './RandomFollowUsers';
import { Input } from './ui/input';
import { UsersList } from './UsersList';
import { prisma } from '@/lib/db/prisma';

export const getWidgetData = async () => {
  try {
    const res = await fetch(
      'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const getUsersAvatar = async () => {
  try {
    const res = await fetch(
      'https://randomuser.me/api/?results=30&inc=name,login,picture'
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const Widgets = async () => {
  const users = await prisma.user.findMany();

  const { articles } = await getWidgetData();
  const { results: randomUsers } = await getUsersAvatar();
  return (
    <div className=' hidden lg:inline ml-8 space-y-5 max-w-[350px] '>
      <div className='flex items-center    sticky top-0 z-50 py-4  '>
        <MagnifyingGlassIcon className='h-6 w-6 text-muted-foreground z-50 absolute left-2' />
        <Input
          type='text'
          placeholder='Search Twitter '
          className=' pl-11   focus:shadow-lg    '
        />
      </div>
      <div className='text-muted-foreground space-y-3 bg-secondary/50 py-4  rounded-xl '>
        <h4 className='font-bold text-xl px-4 text-primary'>Whats happening</h4>
        <News articles={articles} />
      </div>
      <div className=' text-muted-foreground space-y-3 bg-secondary/50  py-4 rounded-lg sticky top-16 '>
        <h4 className='font-bold text-xl px-4 text-primary'>Who to follow</h4>

        <UsersList users={users} />

        <RandomFollowUsers randomUsers={randomUsers} />
      </div>
    </div>
  );
};
