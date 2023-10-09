'use client';
import React, { ReactNode, useEffect, useState, useCallback } from 'react';

import { Follower, Following, User } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export const TooltipUserInfo = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<
    | (User & { following: Following[] } & { follower: Follower[] } & {
        _count: { follower: number; following: number };
      })
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${userId}`, {});
      const userData = await response.json();
      setUserInfo(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Помилка при отриманні інформації про користувача', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <HoverCard>
      <HoverCardTrigger onMouseOver={fetchUserInfo} asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
>
        <section  >
          <div>
            {isLoading && (
              <Loader2 className='animate-spin mx-auto text-center' />
            )}
          </div>
          {!isLoading && (
            <div className='flex justify-between flex-col gap-2'>
              <div className='relative h-11 w-11 '>
                <Image
                  className='object-cover rounded-full'
                  fill
                  alt={'img'}
                  src={userInfo?.image!}
                />
              </div>
              <div>
                <h1 className='text-xl font-semibold'>{userInfo?.name}</h1>
                <p className='text-muted-foreground'>
                  {userInfo?.username || `@${userInfo?.name?.replace(' ', '')}`}
                </p>
              </div>
              <div>
                website:{' '}
                <Link
                onClick={(e)=> e.stopPropagation()}
                  className='hover:underline text-blue-500'
                  href={userInfo?.website || ''}
                  target='_blank'
                >
                  {userInfo?.website}
                </Link>
                <p className='text-muted-foreground'>bio: {userInfo?.bio}</p>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>
                  <strong className='text-primary'>
                    {userInfo?._count.follower}
                  </strong>{' '}
                  followers
                </span>
                <span>
                  <strong className='text-primary'>
                    {userInfo?._count.following}
                  </strong>{' '}
                  following
                </span>
              </div>
            </div>
          )}
        </section>
      </HoverCardContent>
    </HoverCard>
  );
};
