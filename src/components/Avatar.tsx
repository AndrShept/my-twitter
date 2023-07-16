import Image from 'next/image'
import React from 'react'

export const Avatar = () => {
  return (
    <div className="avatar">
  <div className="w-24 rounded-full">
    <Image src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='avatar-img' />
  </div>
</div>
  )
}
