import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { News } from './News';
import { FollowUsers } from './FollowUsers';

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
  const { articles } = await getWidgetData();
  const { results: randomUsers } = await getUsersAvatar();
  return (
    <div className=' hidden lg:inline ml-8 space-y-5 max-w-[350px] '>
      <div className=' sticky top-0 z-50 bg-white py-1.5'>
        <div className='flex items-center p-3 rounded-full  relative'>
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-500 z-50' />
          <input
            type='text'
            placeholder='Search Twitter '
            className='absolute inset-0 rounded-full pl-11  border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100'
          />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-100 pt-2  rounded-xl '>
        <h4 className='font-bold text-xl px-4'>Whats happening</h4>
        <News articles={articles} />
      </div>
      <div className=' text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-lg sticky top-16 '>
        <h4 className='font-bold text-xl px-4'>Who to follow</h4>
        <FollowUsers randomUsers={randomUsers}/>
      </div>
    </div>
  );
};
