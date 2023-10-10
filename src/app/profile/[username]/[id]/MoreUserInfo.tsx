import { User } from '@prisma/client';
import React from 'react';
import { ArrowUpRightSquare, CalendarDays, Info } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

interface MoreUserInfoProps {
  bio: string;
  location: string;
  website: string;
  day: string;
  month: string;
  year: string;
  name: string;
  isShow: boolean;
  userId: string;
}

export const MoreUserInfo = ({
  bio,
  location,
  website,
  day,
  month,
  year,
  name,
  isShow,
  userId,
}: MoreUserInfoProps) => {
  return (
    <section className='text-[15px] gap-y-1'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button className='cursor-help p-0' variant='link'>
            @More Info
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className=''>
          <div className='flex justify-between space-x-4'>
            {/* <Avatar>
              <AvatarImage src='https://github.com/vercel.png' />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar> */}
            <Info className='text-muted-foreground' size={40} />
            <div className='space-y-1'>
              <h4 className='text-sm mb-2 font-semibold'>@{name}</h4>

              {website && (
                <Link
                  target='_blank'
                  href={website}
                  className='flex items-center text-sm hover:underline'
                >
                  <span>
                    website:{' '}
                    <span className='text-muted-foreground'> {website}</span>
                  </span>
                  <ArrowUpRightSquare className='text-muted-foreground h-4 w-4   ml-1' />
                </Link>
              )}

              <p className='text-sm'>
                <span>
                  location:{' '}
                  <span className='text-muted-foreground'>
                    {location || 'these fields are currently empty'}
                  </span>
                </span>
              </p>

              <p className='text-sm'>
                <span>
                  {' '}
                  bio:{' '}
                  <span className='text-muted-foreground'>
                    {' '}
                    {bio || 'these fields are currently empty'}
                  </span>
                </span>
              </p>

              {isShow && (
                <div className='flex items-center pt-2'>
                  <CalendarDays className='mr-1 h-4 w-4 opacity-70' />{' '}
                  <span className='text-xs text-muted-foreground'>
                    Birthday: {day}.{month}.{year}
                  </span>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </section>
  );
};
