'use client'
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react';

const page = () => {
  return <div>


<CldUploadWidget uploadPreset='my-blogX'>
            {({ open }) => {
              function handleOnClick(e:any) {
                e.preventDefault();
                open();
              }
              return (
                <button className='button' onClick={handleOnClick}>
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>

  </div>;
};

export default page;
