'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { UploadIconButton } from './UploadIconButton';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
}

export const ProfileImageUpload = ({
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
      <div className='relative  h-[200px] w-full  '>
        <Image
          className='object-cover object-center'
          alt='img'
          fill
          src={
            value ||
            'https://images.unsplash.com/photo-1514993898616-9f2f3fe1a7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          }
        />
        <UploadIconButton
          disabled={disabled}
          isPending={isPending}
          onChange={onChange}
          uploadImage={uploadImage}
          value={value}
          idImage='profileImage'
        />
      </div>
    </>
  );
};
