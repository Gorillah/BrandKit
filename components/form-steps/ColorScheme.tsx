import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const ColorScheme = [
  "/logoColors/cool_color_scheme.webp",
  "/logoColors/warm_color_scheme.webp",
  "/logoColors/metallic_color_scheme.webp",
  "/logoColors/purple_color_scheme.webp",
  "/logoColors/neon_color_scheme.webp",
  "/logoColors/earth_color_scheme.webp"
]

function Color({ formData, setFormData }: any) {
  return (
    <div>
    <div className='py-4'>
      <h1 className='text-xl font-bold lg:text-3xl'>Select color schemes that matches your brand</h1>
    </div>
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto'>
      {ColorScheme.map((font: string, i) => (
        <div key={i} 
        onClick={() => {
          const index = formData.font.findIndex((f: String) => f === font);
          if(index > -1) {
            setFormData({
              ...formData,
              font: formData.font.filter((f: String) => f !== font) 
            });
          } else {
            setFormData({ 
              ...formData,
              font: [...formData.font, font]
            });
          }
        }}
          className={cn((formData.font.includes(font)) ? 'border-4 border-green-500' : 'border-4 border-transparent', ' hover:cursor-pointer transition flex justify-center items-center hover:scale-[102%] overflow-hidden rounded-[14px]')}>
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

export default Color
