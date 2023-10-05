'use client';

import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentsFilterProps {
  position: string;
  setPosition: (str: string) => void;
}

export const CommentsFilter = ({ position, setPosition }:CommentsFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full' size={'sm'} variant='outline'>
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-max'>
        <DropdownMenuLabel>Filter Date</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value='asc'>CreateDate (asc)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='desc'>CreateDate (desc)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
