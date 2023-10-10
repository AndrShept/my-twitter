import { cn } from '@/lib/utils';
import { Camera, Loader2 , X} from 'lucide-react';
import React from 'react';

interface UploadIconButtonProps {
  onChange: (url: string) => void;
  value: string;
  isPending: boolean;
  disabled: boolean;
  uploadImage: (e: React.ChangeEvent<HTMLInputElement | null>) => void;
  idImage : 'image' | 'profileImage'
}

export const UploadIconButton = ({
  onChange,
  value,
  isPending,
  disabled,
  uploadImage,
  idImage
}: UploadIconButtonProps) => {
  return (
    <div className=' absolute inset-0 flex items-center justify-center'>
      {value && (
        <div
          onClick={() => onChange('')}
          className='p-1 absolute bg-red-500 cursor-pointer rounded-full hover:bg-red-600 transition left-1/2 bottom-1/2 translate-x-3 -translate-y-[18px] '
        >
          <X className='text-white' size={20} />
        </div>
      )}
      <label
        htmlFor={idImage}
        className={cn('bg-black/60 p-6 rounded-full text-muted-foreground cursor-pointer hover:text-white transition',{
            'sm:p-6 p-1': idImage==='image'
        })}
      >
        {isPending ? (
          <Loader2 className='animate-spin' />
        ) : (
          <Camera strokeWidth={1.5} size={35} />
        )}
      </label>
      <input
        disabled={disabled}
        id={idImage}
        hidden
        accept='image/*'
        name='file'
        type='file'
        onChange={uploadImage}
      />
    </div>
  );
};
