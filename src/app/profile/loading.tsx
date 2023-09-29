import React from 'react';

const loading = () => {
  return (
    <div className='flex justify-center mt-20 h-10 mx-auto'>
      {' '}
      <span className='h-8 w-8 loading loading-spinner text-muted-foreground text-base'>
        loading...
      </span>
    </div>
  );
};
export default loading;
