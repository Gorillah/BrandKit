'use client'
 
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, {useEffect} from 'react';
import FormCard from '@/components/FormCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useFormPage, useProgressBar } from '@/store/createLogo';


export default function CreatePage() {

    const router = useRouter()

    const searchParams = useSearchParams()

    const company = searchParams.get('company');

    const {page, setPage} = useFormPage()
    const {progress, setProgress} = useProgressBar()

    useEffect(() => {
        setPage(0)
        setProgress(33)
    }, [setPage, setProgress])

    if(!company) {
        router.push('/')
    }

    const back = function() {
        if(page < 1) router.push('/')
        setPage(page - 1)
        setProgress(progress - 33.3)
      }

      console.log(page)
    return(
        <div className='h-screen'>
             <div className="h-16 flex items-center size-icon p-4 justify-between shadow-md mb-18">
                <Button variant={"link"} onClick={() => {
                    back()
                }}>
                    <ArrowLeft />
                </Button>
            </div>
            <FormCard />
        </div>
    )
}


