'use client'
import { PhotoIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

export const FilePicker = () => {
    const ref = useRef(null)
  return (
    <div>
     <PhotoIcon className='h-8 w-8 p-1 iconHoverEffect text-sky-500 hover:bg-sky-100' />
        <input   type="file" />
        <button >

        </button >
    </div>
  
       
   
  )
}
