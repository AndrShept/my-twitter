import React from 'react';

const page = () => {
  return (
    <div>
      {true && (
        <div className='p-2 space-y-2'>
          <h1 className=' font-semibold text-xl'>
            You don’t have any likes yet
          </h1>
          <span className='text-muted-foreground text-sm '>
            Tap the heart on any post to show it some love. When you do, it’ll
            show up here.
          </span>
        </div>
      )}
    </div>
  );
};

export default page;
