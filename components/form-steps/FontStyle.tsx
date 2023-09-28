import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const fonts = [
  "/fonts/modern.webp",
  "/fonts/elegant.webp",
  "/fonts/handwritten.webp",
  "/fonts/playful.webp",
  "/fonts/slab.webp",
  "/fonts/futuristic.webp",
]

function Font({formData, setFormData}:any) {
  return (
    <div>
      <div className='py-4'>
        <h1 className='text-xl font-bold lg:text-3xl'>Select color schemes that matches your brand</h1>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto'>
        {fonts.map((font: string, i) => (
          <div key={i} 
            onClick={() => setFormData({ ...formData, font: font })}
            className={cn((formData.font === font) ? 'border-4 border-green-500 rounded-[14px] ' : 'border-2 border-transparent rounded-[14px]', 'hover:scale-105 hover:cursor-pointer transition py-10 px-5 md:p-20 flex justify-center items-center bg-gray-200 W-[431px] h-[279px')}>
            <Image
              layout="intrinsic"
              width={431}
              height={279}
              key={i}
              src={font}
              alt="logo"
              objectFit='contain'
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Font