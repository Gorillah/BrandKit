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
import LogoShowcase from "@/components/logoShowcase";
import showcase from "@/public/showcase.png";
import Footer from "@/components/Footer";
import {cn} from "@/lib/utils";

const features = [
  {
    title: "AI Logo Maker",
    desc: "Logo Maker combines your logo design preferences with Artificial Intelligence to help you create a custom logo you will love.",
    img: showcase,
  },
  {
    title: "Brand Center",
    desc: "One-click to activate your personal brand center for more consistent visuals for all your branded content. ",
    img: showcase,
  },
  {
    title: "Social Media",
    desc: "Facebook covers, Twitter headers, and Instagram stories, your on-brand social media content is all part of your brand package.",
    img: showcase,
  },
  {
    title: "Social Media",
    desc: "Whether it’s for hiring or promotions, you can customize and download your branded poster all within your brand center.",
    img: showcase,
  },
];

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
    <div className="flex flex-col space-y-10">
      <div className="h-fit flex flex-col bg-[#2127b3] text-white py-20">
        <div className="container flex items-center justify-center lg:justify-between h-full">
          <div className="flex flex-col gap-y-6 w-[500px]">
            <h1 className="text-6xl font-bold">Make a logo with LOGO</h1>
            <h2 className="font-medium text-xl">
              <TypewriterTitle />
            </h2>
            <p className="text-medium">
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
                    disabled={isLoading}
                    className="col-span-12 lg:col-span-3 bg-[#F64C72]"
                  >
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
                sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
              />
            </AspectRatio>
          </div>
        </div>
      </div>

      <LogoShowcase />

      <div className="container flex flex-col gap-6">
        <div>
          <h3 className="text-3xl text-bold text-center animate-float">
            Brand Logo Design
          </h3>
          <p className="max-w-2xl text-center mx-auto">
            LogoAI is a brand building platform that can help you create
            professional logos, design matching identities, and automate brand
            promotion with on-brand social media content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4">
          {features.map((feature, idx) => (
              <div className={cn(idx % 2 === 0 ? "flex-row-reverse" : "flex-row", "w-full flex gap-2 bg-slate-300 py-2 px-4")}key={idx}>
              <div className="w-1/3">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/logo-placeholder-image.png"
                    alt="Logo"
                    fill
                  ></Image>
                </AspectRatio>
              </div>
              <div className="w-2/3 flex flex-col justify-center">
                <h3 className="text-xl text-semibold">test</h3>
                <p className="text-md">
                  Anim commodo laborum quis aliqua. laborum quis aliqua
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
