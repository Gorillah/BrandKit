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

// const handleClick = (font) => {
//   setFormData(prev => ({
//     ...prev,
//     fonts: [...(prev.fonts || []), font]  
//   }))
// }

function Font({formData, setFormData}:any) {
  return (
    <div>
      <div className='py-4'>
        <h1 className='text-xl font-bold lg:text-3xl'>Select color schemes that matches your brand</h1>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto'>
        {fonts.map((font: string, i) => (
          <div key={i} 
          onClick={() => {
            const index = formData.font.findIndex(f => f === font);
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
            className={cn((formData.font.includes(font)) ? 'border-4 border-green-500' : 'border-4 border-transparent ', ' hover:cursor-pointer transition py-10 px-5 md:p-20 flex justify-center items-center bg-gray-200 outline-none hover:scale-[102%] overflow-hidden rounded-[14px]')}>
            <Image
              width={431}
              height={279}
              key={i}
              src={font}
              alt="logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Font