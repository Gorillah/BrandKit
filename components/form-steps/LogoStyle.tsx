import React, { useState } from 'react'
import Image from 'next/image'
import {cn} from "@/lib/utils"

const logos = [
  '/logoStyles/combination_mark_logos.webp',
  '/logoStyles/wordmark_logos.webp',
  '/logoStyles/lettermark_logos.webp',
  '/logoStyles/monogram_logos.webp',
  '/logoStyles/letterform_logos.webp',
  '/logoStyles/abstract_logos.webp',
  '/logoStyles/mascot_logos.webp',
  '/logoStyles/emblem_logos.webp',
  '/logoStyles/negative_space_logos.webp'
];

function Style({formData, setFormData}: any) {

  return (
    <div>
    <div className='py-4'>
      <h1 className='text-xl font-bold lg:text-3xl'>Select color schemes that matches your brand</h1>
    </div>
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto'>
      {logos.map((font: string, i) => (
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
          className={cn((formData.font.includes(font)) ? 'border-4 border-green-500 rounded-[14px] ' : 'border-4 border-transparent rounded-[14px]', ' hover:cursor-pointer transition p-2 md:p-2 flex justify-center items-center bg-gray-200 outline-none rounded-lg hover:scale-[102%] overflow-hidden')}>
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

export default Style