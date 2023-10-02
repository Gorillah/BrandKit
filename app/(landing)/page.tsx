"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyFormSchema } from "./constants";
import { useRouter } from "next/navigation";
import TypewriterTitle from "@/components/TypewriterTitle";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HomePage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    console.log("Clicked!, values: ", values);
    router.push("/create?company=" + values.companyName);
  };

  return (
    <div className="flex flex-col space-y-10 bg-slate-300">
      <div className="bg-gray-500 h-[500px] flex flex-col"> {/*bg*/}
        <div className="container flex items-center justify-center lg:justify-between h-full">
          <div className="flex flex-col gap-y-6 w-[500px]">
            <h1 className="text-6xl font-bold">Make a logo with LOGO</h1>
            <h2 className="font-medium text-xl">
              <TypewriterTitle />
            </h2>
            <p className="text-sm text-medium">
              Logo Maker combines your logo design preferences with Artificial
              Intelligence to help you create a custom logo you will love. All
              it takes is a few clicks and five minutes.
            </p>
            <div className="w-full flex flex-col gap-3 md:flex-row gap-x-3">
              <Form {...form}>
                <form
                  className="grid grid-cols-12 gap-3 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    name="companyName"
                    render={({ field }) => (
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
                  <Button
                    disabled={isLoading}
                    className="col-span-12 lg:col-span-2"
                  >
                    Create
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Image
              src="/logo-placeholder-image.png"
              alt="Logo"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-2 lg:grid-cols-4 w-full gap-4">
        <div>
          <AspectRatio ratio={1 / 1}>
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
          </AspectRatio>
        </div>

        <div>
          <AspectRatio ratio={1 / 1}>
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
          </AspectRatio>
        </div>

        <div>
          <AspectRatio ratio={1 / 1}>
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
          </AspectRatio>
        </div>

        <div>
          <AspectRatio ratio={1 / 1}>
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
            <Image
              className="grid col-span-2"
              src="/square-placeholder.png"
              alt="Logo"
              fill
            />
          </AspectRatio>
        </div>
      </div>

      <div className="container">
        <div>
          <h3 className="text-2xl text-center">Brand Logo Design</h3>
          <p>
            LogoAI is a brand building platform that can help you create
            professional logos, design matching identities, and automate brand
            promotion with on-brand social media content.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full">
          <div>
            <AspectRatio ratio={1 / 1}>
              <Image src="/logo-placeholder-image.png" alt="Logo" fill></Image>
            </AspectRatio>
            <h3 className="text-xl text-semibold">test</h3>
            <p className="text-md">
              Anim commodo laborum quis aliqua. laborum quis aliqua
            </p>
          </div>
          <div>
            <AspectRatio ratio={1 / 1}>
              <Image src="/logo-placeholder-image.png" alt="Logo" fill></Image>
            </AspectRatio>
            <h4>test</h4>
            <p>testopfkrseafka g resg </p>
          </div>
        </div>
      </div>
    </div>
  );
}
