"use client";

import React from "react";
import TypewriterTitle from "./TypewriterTitle";
import { useForm } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import showcase from "@/public/showcase.png";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema } from "@/app/(landing)/constants";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function CreateLogoForm() {
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    router.push("/create?company=" + values.companyName);
  };
  return (
    <div className="h-fit flex flex-col bg-[#2127b3] text-white py-20">
      <div className="container flex items-center justify-center lg:justify-between h-full">
        <div className="flex flex-col gap-y-6 w-[500px]">
          <h1 className="text-6xl font-bold">Make a logo with BrandKit</h1>
          <h2 className="font-medium text-xl h-4">
            <TypewriterTitle />
          </h2>
          <p className="text-lg">
            BrandKit is the easiest way to create a professional logo. Just add your company, and we generates a
            professional logo in seconds. No design skills needed
          </p>
          <div className="w-full flex flex-col gap-3 md:flex-row gap-x-3">
            <Form {...form}>
              <form className="grid grid-cols-12 gap-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-9">
                      <FormControl>
                        <Input
                          className="flex w-full text-md text-black"
                          disabled={isLoading}
                          placeholder="Your company name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  disabled={isLoading}
                  className="col-span-12 lg:col-span-3 text-xl"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden lg:flex relative w-[500px] h-[500px]">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={showcase}
              className="animate-float"
              alt="Logo"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
