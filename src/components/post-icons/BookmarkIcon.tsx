'use client';
import { cn } from '@/lib/utils';
import { FavoritePost } from '@prisma/client';
import { Bookmark, BookmarkMinusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BookmarkIconProps {
  postId: string;
  favoritePost: FavoritePost[];
}

export const BookmarkIcon = ({ postId, favoritePost }: BookmarkIconProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [favoriteState, setFavoriteState] = useState<boolean | undefined>();
  const addBookmark = async () => {
    if (!session) {
      return;
    }
    try {
      setFavoriteState(!favoriteState);
      const res = await fetch(`/api/posts/${postId}/bookmarks`, {
        method: 'POST',
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const favoritePostExist = favoritePost.some(
    (favorite) => favorite.postId === postId
  );

  useEffect(() => {
    setFavoriteState(favoritePostExist);
  }, [favoritePostExist]);
  return (
    <div
      onClick={addBookmark}
      data-tip='bookmark'
      className=' tooltip p-2 rounded-full transition cursor-pointer  hover:text-sky-500 hover:bg-secondary flex items-center justify-center '
    >
      <Bookmark
        className={cn(' h-5 w-5', {
          'fill-current': favoriteState && session,
        })}
      />
    </div>
  );
};
