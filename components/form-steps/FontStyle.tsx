import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useFormData } from '@/store/createLogo'

const fonts = [
  "/fonts/modern.webp",
  "/fonts/elegant.webp",
  "/fonts/handwritten.webp",
  "/fonts/playful.webp",
  "/fonts/slab.webp",
  "/fonts/futuristic.webp",
]

function Font() {

  const { fontStyle, setFontStyle, removeFontStyle } = useFormData();

  return (
    <div>
      <div className='py-4'>
        <h1 className='text-xl font-bold lg:text-3xl'>Select color schemes that matches your brand</h1>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto'>
        {fonts.map((font: string, i) => (
          <div key={i} 
          onClick={() => {
            const index = fontStyle.findIndex((f: String) => f === font);
            if(index > -1) {
              removeFontStyle(font);
            } else {
              setFontStyle(font);
            }
          }}
            className={cn((fontStyle.includes(font)) ? 'border-4 border-green-500' : 'border-4 border-transparent ', ' hover:cursor-pointer transition py-10 px-5 md:p-20 flex justify-center items-center bg-gray-200 outline-none hover:scale-[102%] overflow-hidden rounded-[14px]')}>
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