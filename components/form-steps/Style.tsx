import React, { useState } from 'react'
import Image from 'next/image'
import {cn} from "@/lib/utils"

const images = [
  "/Emblems_style.webp",
  "/Letterforms_style.webp",
  "/Mascots_style.webp",
  "/Pictorials_style.webp"
];

function Style({formData, setFormData}: any) {
  
  return (
    <div className='flex flex-wrap justify-evenly '>
                {images.map((image: string, i) => (
                    <Image 
                        className={cn((formData.style === image) ? 'border-2 border-green-500' : 'border-2 border-transparent')}
                        layout="intrinsic"
                        width={500}
                        height={200} 
                        key={i}
                        src={image}
                        onClick={() => setFormData({...formData, style: image})}
                        alt="logo"
                        objectFit='contain'
                        loading="lazy"
                    />
                ))}
            </div>
  )
}

export default Style