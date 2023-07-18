'use client';
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useRef, useState, useTransition } from 'react';
import { Session } from 'next-auth';
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';

export const Input = ({ session }: { session: Session }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imgSize, setImgSize] = useState(0);
  const [isPendingImg, startTransition] = useTransition();
  const [isPendingData, startTransitionData] = useTransition();
  const ref = useRef(null);
  const CLOUD_NAME = 'dn4qas6ys';
  const UPLOAD_PRESET = 'my-twitter';

  const uploadImage = async (e: any) => {
    const photo = e.target.files[0];

    if (!photo) return;

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
      startTransition(async () => {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data, 'DATA');

        setImageUrl(data.secure_url);
        setImgSize(data.bytes)
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
        const res = await fetch(`/api/tweet`, {
          method: 'POST',
          body: JSON.stringify({
            content,
            image: imageUrl,
            authorId: session?.user?.id,
            authorName: session.user.username,
            authorImage: session.user.image,
          }),
        });
        if (!res.ok) {
          throw new Error('Error occurred');
        }
        if (res.ok) {
          toast.success('Post created success!');
          redirect('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
      <div className='w-[68px]'>
        <Image
          className='ml-2 rounded-full w-11 h-11 object-cover cursor-pointer hover:brightness-95 '
          height={400}
          width={400}
          alt='avatar_img'
          src={session?.user.image || ''}
        />
      </div>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className='w-full divide-y divide-gray-200'
      >
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name='text'
          className=' w-full p-2  text-lg  placeholder-gray-400  tracking-wide min-h-[50px] text-gray-700'
          rows={2}
          placeholder='Whats happening'
        />

        {imageUrl && (
          <Image
            src={imageUrl!}
            alt='image'
            width={500}
            height={500}
            className={`w-full rounded-xl  `}
          />
        )}

        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex items-center '>
            <span className='text-sky-500 text-xs'>Upload</span>
            <label className='flex items-center' htmlFor='image'>
              {isPendingImg ? (
                <span className='loading loading-spinner text-sky-500 mr-2 ' />
              ) : (
                <PhotoIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
              )}
            </label>
            <input
              id='image'
              hidden
              accept='image/*'
              name='file'
              type='file'
              onChange={uploadImage}
            />
            <FaceSmileIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
            {imageUrl && (
              <div className='flex items-center gap-3'>
                {' '}
                <span
                  onClick={() => setImageUrl('')}
                  className='hover:underline ml-4 cursor-pointer text-red-600 font-medium hover:bg-red-100 hover:px-2 hover:py-1 rounded-full px-2 py-1 duration-300 '
                >
                  remove
                </span>{' '}
                <span>{(imgSize/1048576).toFixed(2)} mb</span>
              </div>
            )}
          </div>
          {/* <TweetButton /> */}
          <div className='flex items-center gap-3'>
            {isPendingData && (
              <span className='loading loading-spinner loading-md text-gray-400' />
            )}
            <button
              disabled={isPendingImg || isPendingData}
              className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
