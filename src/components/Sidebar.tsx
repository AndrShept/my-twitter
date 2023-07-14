import Image from 'next/image';
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';

export const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col p-2  xl:items-start xl:justify-center fixed h-full xl:ml-24'>
     
        <Image className='cursor-pointer hoverEffect h-20 w-20'
          height='100'
          width='100'
          src={
            'https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
          }
          alt='logo'
        />
  
      <div className='mt-4 mb-2.5 xl:items-start  '>

      <SidebarMenuItem  />

      </div>
    </div>
  );
};
