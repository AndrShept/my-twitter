'use client';
import React, { useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useClickAway } from 'react-use';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface EmojiIconProps {
  content: string;
  setContent: (str: string) => void;
  className?: string
}

export const EmojiIcon = ({ content, setContent, className }: EmojiIconProps) => {
  const { theme } = useTheme();
  const [isEmojiShow, setIsEmojiShow] = useState(false);
  const refEmoji = useRef(null);
  const handleEmojiClick = (e: any) => {
    const sym = e.unified.split('_');
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codeArray);
    setContent(content + emoji);
  };

  useClickAway(refEmoji, () => {
    if (isEmojiShow) {
      setIsEmojiShow(false);
    }
  });
  return (
    <div className='relative'>
      <FaceSmileIcon
        onClick={() => setIsEmojiShow(true)}
        className='h-8 w-8 p-1  rounded-full transition cursor-pointer text-muted-foreground hover:bg-secondary'
      />
      {isEmojiShow && (
        <div
          ref={refEmoji}
          className={cn('absolute z-10  sm:left-0 -left-10 top-9  ', className)}
        >
          <Picker
       
            data={data}
            theme={theme === 'dark' ? 'dark' : 'light'}
            onEmojiSelect={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};
