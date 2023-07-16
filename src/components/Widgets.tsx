import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

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
  const usersAvatars = await getUsersAvatar();
console.log(usersAvatars.results)
  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5 '>
      <div className='w-[90%] xl:w-[75%] sticky top-0 z-50 bg-white py-1.5'>
        <div className='flex items-center p-3 rounded-full bg-red-300 relative'>
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-500 z-50' />
          <input
            type='text'
            placeholder='Search Twitter '
            className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100'
          />
          asddasasddas
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-100 rounded-full pt-2 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4'>Whats happening</h4>
      </div>
    </div>
  );
};
