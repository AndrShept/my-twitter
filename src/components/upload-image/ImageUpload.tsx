'use client';

import Image from 'next/image';
import { UploadIconButton } from './UploadIconButton';
import { useTransition } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isPending, startTransition] = useTransition();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement | null>) => {
    const photo = e.target!.files![0];

    if (!photo) return;

    const formData = new FormData();
    formData.append('file', photo);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
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

        onChange(data.secure_url);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex justify-between md:p-5 p-2 relative  '>
        <div className='p-[2px] bg-white   rounded-full absolute top-0 -translate-y-[50%] '>
          <Image
            height={500}
            width={500}
            alt='avatar'
            className='md:h-[120px] md:w-[120px] w-[60px] h-[60px] mr-0 rounded-full object-cover'
            src={
              value ||
              'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
            }
          />
          <UploadIconButton
            disabled={disabled}
            isPending={isPending}
            onChange={onChange}
            uploadImage={uploadImage}
            value={value}
            idImage='image'
          />
        </div>
      </div>
    </>
  );
};
