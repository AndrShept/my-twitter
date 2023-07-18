'use client';
import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { toast } from 'react-hot-toast';

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className: string;
};

export const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending, method  } = useFormStatus();
  if (method){
    toast.success('Product added !')
  }

 

  return (
    <button
      {...props}
      disabled={pending}
      type='submit'
      className={`btn btn-neutral ${className}`}
    >
      {children}
      {pending && <span className='loading loading-spinner ' />}
    </button>
  );
};
