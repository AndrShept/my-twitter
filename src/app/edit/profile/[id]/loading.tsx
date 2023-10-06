import { Loader2 } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <>
      <Loader2  className='animate-spin mx-auto mt-20' size={40} />
    </>
  );
};
export default loading;
