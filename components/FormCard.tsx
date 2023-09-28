"use client"

import {Button} from '@/components/ui/button'
import Style from "@/components/form-steps/Style"
import Color from "@/components/form-steps/Color"
import Font from "@/components/form-steps/Font"
import { Progress } from '@/components/ui/progress';
import React from 'react'
import {useProgressBar} from '@/store/createLogo'
import {useFormPage} from '@/store/createLogo'



export default function FormCard() {
  
  const {progress, setProgress} = useProgressBar()
  const {page, setPage} = useFormPage()

  const next = function() {
    if(page > 1) return
    setPage(page + 1)
    setProgress(progress + 33.3)
  }

  const [formData, setFormData] = React.useState({
    style: "",
    color: "",
    font: ""
  })

  const pages = [
    <Style formData={formData} setFormData={setFormData} key={0}/>,
    <Color formData={formData} setFormData={setFormData} key={1}/>,
    <Font formData={formData} setFormData={setFormData} key={2}/>
  ]

  return (
    <div className="form flex flex-col space-y-4">
      <Progress value={progress} className='w-full'/>
      <div className='flex flex-col container'>
        <div className='grid grid-cols-6 w-full items-center'>
          <h1 className='text-4xl col-span-4 flex flex-1'>Select Style</h1>
        </div>
        {pages[page]}
        <div className='flex justify-center fixed bottom-0 left-0 right-0 mx-auto pb-2'>
            <Button 
            className='h-14 text-lg w-40' 
            onClick={() => {
              if(page > 1) {
                // REDIRECT TO LOGO PAGE
                // SEND FORM DATA TO API CALL
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