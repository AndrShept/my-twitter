import { BackArrow } from '@/components/BackArrow';
import React, { ReactNode } from 'react';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { UserAvatar } from '@/components/UserAvatar';
import { ProfileLinkMenu } from './ProfileLinkMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { Metadata } from 'next';
import { MoreUserInfo } from './MoreUserInfo';
import { BirthdaySwitch } from '../../BirthdaySwitch';

export const generateMetadata = async ({
  params,
}: {
  params: { username: string; id: string };
}): Promise<Metadata> => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return {
    title: `User info ${user?.name}`,
  };
};

interface layoutProps {
  children: ReactNode;
  params: { username: string; id: string };
}

const layout = async ({ children, params }: layoutProps) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      _count: {
        select: {
          following: true,
          follower: true,
          favoritePosts: true,
          like: true,
          post: true,
        },
      },
    },
  });
  if (!user) {
    return;
  }
  return (
    <section className='border border-border min-h-full  '>
      <div className='sticky  top-0 z-50 p-2 flex items-center bg-background/80 gap-2 border-b border-border backdrop-blur-md '>
        <div className=' flex items-center justify-center  '>
          <BackArrow />
        </div>
        <div>
          <h2 className='text-xl text-primary font-semibold leading-none'>
            {user?.name}
          </h2>
          <span className='text-muted-foreground text-sm'>
            {user?._count.post} posts
          </span>
        </div>
      </div>

      <div className='w-full h-[400px]'>
        <div className='relative  h-[50%]'>
          <Image
            className='object-cover object-center'
            alt='img'
            fill
            src={
              user.profileImage ||
              'https://images.unsplash.com/photo-1514993898616-9f2f3fe1a7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            }
          />
        </div>
        <div className=''>
          <div className='flex justify-between md:p-5 p-2 relative h-[70px] '>
            <div className='p-[2px] bg-white rounded-full absolute top-0 -translate-y-[50%] '>
              <UserAvatar
                userName={user.name || user.username || ''}
                userId={user.id}
                className='md:h-[120px] md:w-[120px] w-[60px] h-[60px] mr-0'
                userImage={user?.image || ''}
              />
            </div>
            {user.id === session?.user.id && (
              <Button
                asChild
                className='rounded-full ml-auto'
                variant={'default'}
              >
                <Link href={`/edit/profile/${session.user.id}`}>
                  Edit profile
                </Link>
              </Button>
            )}
          </div>
          <div className='md:p-5 p-2 flex flex-col gap-2'>
            <div>
              <h1 className='font-bold text-xl'>{user?.name}</h1>
              <span className='text-muted-foreground'>
                {user?.username ||
                  `@${user?.name?.replace(' ', '').toLowerCase()}`}
              </span>
            </div>
            <div className='flex space-x-1 text-muted-foreground items-center text-[15px]'>
              <div>
                <CalendarDays size={18} />
              </div>
              <span>Joined</span>
              <span>
                {user.createdAt?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className='text-muted-foreground text-sm flex space-x-4'>
              <div className='hover:underline flex  '>
                <span className='text-primary mr-1'>
                  {' '}
                  {user?._count.following}
                </span>
                Following
              </div>
              <div className='hover:underline flex '>
                <span className='text-primary mr-1'>
                  {' '}
                  {user._count.follower}{' '}
                </span>{' '}
                Followers
              </div>
            </div>
            <MoreUserInfo
              bio={user.bio!}
              location={user.location!}
              website={user.website!}
              day={user.birthDay!}
              month={user.birthMonth!}
              year={user.birthYear!}
              name={user.name!}
              isShow={user.isBirthdayShow}
              userId={user.id}
            />
      { session?.user.id === user.id   &&     <BirthdaySwitch defaultValue={user.isBirthdayShow!} />}
          </div>
        </div>
      </div>
      <ul className=' mt-32 grid grid-cols-5 w-full overflow-x-auto '>
        <ProfileLinkMenu
          userId={user.id}
          username={user.name!.replace(' ', '')}
        />
      </ul>

      <div className='text-center sm:w-full w-[420px]  mx-auto mt-10'>
        {children}
      </div>
    </section>
  );
};

export default layout;
