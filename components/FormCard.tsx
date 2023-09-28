"use client"

import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import Style from "@/components/form-steps/LogoStyle"
import Color from "@/components/form-steps/ColorScheme"
import Font from "@/components/form-steps/FontStyle"
import { Progress } from '@/components/ui/progress';
import React from 'react'
import {useProgressBar} from '@/store/createLogo'
import {useFormPage} from '@/store/createLogo'
import { v4 as uuidv4 } from 'uuid';

export default function FormCard() {
  
  const {progress, setProgress} = useProgressBar()
  const {page, setPage} = useFormPage()

  const router = useRouter();

  const next = function() {
    if(page > 1) return
    setPage(page + 1)
    setProgress(progress + 33.3)
  }

  const [formData, setFormData] = React.useState({
    style: "",
    color: "",
    font: "",
    // Generate a rondom number as an id for the logo
    id: uuidv4()
  })

  console.log(formData.id)

  const pages = [
    <Style formData={formData} setFormData={setFormData} key={0}/>,
    <Color formData={formData} setFormData={setFormData} key={1}/>,
    <Font formData={formData} setFormData={setFormData} key={2}/>
  ]

  return (
    <div className="form flex flex-col space-y-4">
      <Progress value={progress} className='w-full'/>
      <div className='flex flex-col container'>
        <div className='transition transform duration-500 slide-in-left'>
          {pages[page]}
        </div>
        <div className='flex justify-center fixed bottom-0 left-0 right-0 mx-auto pb-2'>
            <Button 
            className='h-14 text-lg w-40 lg:w-[500px]' 
            onClick={() => {
              if(page > 1) {
                // REDIRECT TO LOGO PAGE
                router.push('/logo/' + formData.id)
                // SEND FORM DATA TO API CALLIs it color
                return
              } 
              next()
            }}
              >{page === 2 ? "Generate" : "Next"}</Button>
        </div>
      </div>
    </div>
  )
}