import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Eye } from 'lucide-react';
import React from 'react';

export const ChartBarPostIcon = ({ viewCount }: { viewCount: number }) => {
  return (
    <div  data-tip='view' className='p-2 rounded-full tooltip transition hover:text-sky-500 hover:bg-secondary flex items-center justify-center'>
      <Eye className='h-5 w-5' />
      <span className='group-hover:text-sky-500 text-xs  font-semibold ml-1'>
        {viewCount > 0 && viewCount}
      </span>
    </div>
  );
};
