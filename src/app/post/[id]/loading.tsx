import { defaults } from 'autoprefixer'
import React from 'react'

 const loading = () => {
  return (
    <div className='flex justify-center mt-20 h-10'> <span className='h-8 w-8 loading loading-spinner text-gray-500 text-base'>loading...</span></div>
  )
}
export default loading