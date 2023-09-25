"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyFormSchema } from "../constants";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter()

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: ''
    }
  });

  const isLoading = form.formState.isSubmitting

  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    console.log("Clicked!, values: ", values);
    router.push('/create?company=' + values.companyName)
  }

  return (
    <div className="container flex items-center justify-center my-8 md:my-[120px]">
      <div className="flex flex-col max-w-[800px] items-center space-y-6"> 
        <h1 className="text-6xl text-center font-bold">Make a logo with LOGO</h1>
        <p className="text-sm text-center text-medium">Logo Maker combines your logo design preferences with Artificial Intelligence to help you create a custom logo you will love. All it takes is a few clicks and five minutes.</p>
        <div className="w-full flex flex-col gap-3 md:flex-row gap-x-3">
          <Form {...form}>
            <form className="grid grid-cols-12 gap-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField name="companyName" render={({field}) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input 
                      className="flex w-full text-md" 
                      disabled={isLoading} 
                      placeholder="Your company name" 
                      {...field}
                    />
                  </FormControl>
                  </FormItem>
                  )}
                />
                  <Button disabled={isLoading} className="col-span-12 lg:col-span-2">Create</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
