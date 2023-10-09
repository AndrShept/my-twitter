'use client';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useRef, useState, useTransition } from 'react';
import { Session } from 'next-auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SessionAvatar } from './SessionAvatar';

import { EmojiIcon } from './EmojiIcon';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export const Input = ({ session }: { session: Session }) => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imgSize, setImgSize] = useState(0);
  const [isPendingImg, startTransition] = useTransition();
  const [isPendingData, startTransitionData] = useTransition();

  const refEmoji = useRef(null);
  const ref = useRef(null);


  const uploadImage = async (e: any) => {
    const photo = e.target.files[0];

    if (!photo) return;

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    try {
      startTransition(async () => {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();

        setImageUrl(data.secure_url);
        setImgSize(data.bytes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl || !content) {
      toast.error('All fields are required');
      return;
    }

    try {
      startTransitionData(async () => {
        const res = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({
            content,
            image: imageUrl,
            authorId: session?.user?.id,
            authorName: session.user.name,
            authorUserName: session.user.username,
            authorImage: session.user.image,
          }),
        });
        if (!res.ok) {
          throw new Error('Error occurred');
        }
        if (res.ok) {
          toast.success('Post created success!');
          setContent('');
          setImageUrl('');
          router.refresh();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex border-b border-border p-3 space-x-3 bg-secondary/20'>
      <SessionAvatar session={session} />

      <form
        ref={ref}
        onSubmit={handleSubmit}
        className='w-full divide-y divide-border'
      >
        <Textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value.trimStart())}
          name='text'
          className=' w-full p-2 min-h-[50px] '
          rows={2}
          placeholder='Whats happening'
        />

        {imageUrl && (
          <Image
            src={imageUrl!}
            alt='image'
            width={500}
            height={500}
            className={`w-full rounded-xl mt-4  `}
          />
        )}

        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex items-center '>
            <span className='text-muted-foreground text-xs'>Upload</span>
            <label className='flex items-center' htmlFor='image'>
              <PhotoIcon className='h-8 w-8 p-1  rounded-full transition cursor-pointer text-muted-foreground hover:bg-secondary' />
            </label>
            <input
              id='image'
              hidden
              accept='image/*'
              name='file'
              type='file'
              onChange={uploadImage}
            />
            <EmojiIcon content={content} setContent={setContent} />
            {imageUrl && (
              <div className='flex items-center gap-1'>
                <span
                  onClick={() => setImageUrl('')}
                  className='hover:underline ml-4 cursor-pointer text-red-600 font-medium hover:bg-secondary hover:px-2 hover:py-1 rounded-full px-2 py-1 duration-300 '
                >
                  remove
                </span>
                <span className='text-sm text-muted-foreground'>
                  {(imgSize / 1048576).toFixed(2)} mb
                </span>
              </div>
            )}

            {isPendingImg && (
              <span className='loading loading-spinner text-muted-foreground ml-2 ' />
            )}
          </div>
          {/* <TweetButton /> */}
          <div className='flex items-center gap-3'>
            {isPendingData && (
              <span className='loading loading-spinner loading-md' />
            )}
            <Button
              disabled={isPendingImg || isPendingData}
              className='  rounded-full font-bold shadow-md '
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
