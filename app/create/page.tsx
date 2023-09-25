'use client'
 
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const company = searchParams.get('company');
    if(!company) {
        router.push('/')
    }
    return(
        <div className='flex flex-col W bg-slate-400 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%'>
            <h1>{company}</h1>
            <p>Create Page</p>
        </div>
    )
}