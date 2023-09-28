import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const ColorScheme = [
  "/cool_color_scheme.webp",
  "/warm_color_scheme.webp",
  "/metallic_color_scheme.webp",
  "/purple_color_scheme.webp",
  "/neon_color_scheme.webp",
  "/earth_color_scheme.webp"
]

function Color({ formData, setFormData }: any) {
  return (
    <div className='py-6'>
      <div className='grid grid-cols-2 gap-2 md:gap-4 w-fit mx-auto'>
        {ColorScheme.map((image: string, i) => (
          <Image
            className={cn((formData.color === image) ? 'border-4 border-green-500 rounded-[14px]' : 'border-2 border-transparent rounded-[14px]', 'hover:scale-105 hover:cursor-pointer transition ')}
            layout="intrinsic"
            width={431}
            height={279}
            key={i}
            src={image}
            onClick={() => setFormData({ ...formData, color: image })}
            alt="logo"
            objectFit='contain'
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}

export default Color
