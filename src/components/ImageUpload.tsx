'use client';
import { Camera } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

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
  return (
    <>
      <div className='flex justify-between md:p-5 p-2 relative  '>
        <div className='p-[2px] bg-white   rounded-full absolute top-0 -translate-y-[50%] '>
          <Image
            height={500}
            width={500}
            alt='avatar'
            className='md:h-[120px] md:w-[120px] w-[60px] h-[60px] mr-0 rounded-full'
            src={
              value ||
              'https://images.unsplash.com/photo-1690233662564-f599cc764cca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80'
            }
          />
          <div className='absolute inset-0 flex items-center justify-center '>
            <CldUploadButton // npm i next-cloudinary
              onUpload={(result: any) => onChange(result.info.secure_url)}
              options={{ maxFiles: 1 }}
              uploadPreset='my-blogX' // cloudinary settings/Upload
            >
              <div className='bg-black/60 sm:p-4 p-2 cursor-pointer rounded-full text-muted-foreground hover:text-white transition'>
                <Camera strokeWidth={1.5} className='sm:h-8 sm:w-8 w-6 h-6' />
              </div>
            </CldUploadButton>
          </div>

        </div>
      </div>
    </>
  );
};
