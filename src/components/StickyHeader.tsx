import React from 'react';
import { BackArrow } from './BackArrow';

interface StickyHeaderProps {
  username: string;
  pagename: string;
}
export const StickyHeader = ({ username, pagename }: StickyHeaderProps) => {
  return (
    <div className='sticky mb-2 top-0 z-50 p-2 flex items-center bg-background/80 gap-2 border-b border-border backdrop-blur-md '>
      <div className=' flex items-center justify-center  '>
        <BackArrow />
      </div>
      <div>
        <h2 className='text-xl text-primary font-semibold leading-none'>
          {pagename}
        </h2>
        <span className='text-muted-foreground text-base'>
          {username}
        </span>
      </div>
    </div>
  );
};
