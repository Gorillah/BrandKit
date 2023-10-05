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
import { cn } from "@/lib/utils";
import { BadgeHelp, Blocks, Bot, FileStack } from "lucide-react";

const features = [
  {
    label: "Advanced AI Logo Creator",
    desc: "Our AI generates 100% unique logo concepts personalized to your brand style. No copied designs.",
    img: Bot,
  },
  {
    label: "Unlimited Revisions",
    desc: "Not happy? Get unlimited revisions for your one-of-a-kind logo.",
    img: FileStack,
  },
  {
    label: "Seamless Integrations",
    desc: "Export your unique logo and brand assets with one click.",
    img: Blocks,
  },
  {
    label: "24/7 Customer Support",
    desc: "Design experts available around the clock to help customize your unique brand identity.",
    img: BadgeHelp,
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
    router.push("/create?company=" + values.companyName);
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="h-fit flex flex-col bg-[#2127b3] text-white py-20">
        <div className="container flex items-center justify-center lg:justify-between h-full">
          <div className="flex flex-col gap-y-6 w-[500px]">
            <h1 className="text-6xl font-bold">Make a logo with BrandKit</h1>
            <h2 className="font-medium text-xl">
              <TypewriterTitle />
            </h2>
            <p className="text-lg">
              BrandKit is the easiest way to create a professional logo. Just
              add your company, and we generates a professional logo in seconds.
              No design skills needed
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
                    size={"lg"}
                    disabled={isLoading}
                    className="col-span-12 lg:col-span-3 bg-[#F64C72] text-xl"
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

      <div className="container flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold text-center">Brand Logo Design</h3>
          <p className="max-w-2xl text-center text-lg lg:text-xl mx-auto">
            BrandKit is a brand building platform that can help you create
            professional logos, design matching identities, and automate brand
            promotion with on-brand social media content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4 ">
          {features.map((feature, idx) => (
            <div
              className={cn(
                idx % 2 === 0 ? "flex-row" : "flex-row-reverse md:flex-row",
                "w-full flex gap-2 px-6 min-h-[200px] rounded-lg text-white bg-[#2127b3]"
              )}
              key={idx}
            >
              <div className="w-1/4 flex items-center justify-center">
                <feature.img size={80} />
              </div>
              <div className="w-3/4 flex flex-col justify-center gap-3">
                <h3 className="text-xl font-bold">{feature.label}</h3>
                <p className="text-md">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
