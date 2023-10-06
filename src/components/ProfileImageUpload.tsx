'use client';
import { Camera } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

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
        <div className='absolute inset-0 flex items-center justify-center'>
          <CldUploadButton // npm i next-cloudinary
            onUpload={(result: any) => onChange(result.info.secure_url)}
            options={{ maxFiles: 1 }}
            uploadPreset='my-blogX' // cloudinary settings/Upload
          >
            <div className='bg-black/60 p-6 rounded-full text-muted-foreground hover:text-white transition'>
              <Camera strokeWidth={1.5} size={35} />
            </div>
          </CldUploadButton>
        </div>
      </div>
    </>
  );
};
