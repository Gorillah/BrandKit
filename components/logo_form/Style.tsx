import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFormData } from "@/store/createLogo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const logos = [
  "/logoStyles/combination_mark_logos.png",
  "/logoStyles/wordmark_logos.png",
  "/logoStyles/lettermark_logos.png",
  "/logoStyles/monogram_logos.png",
  "/logoStyles/letterform_logos.png",
  "/logoStyles/abstract_logos.png",
  "/logoStyles/mascot_logos.png",
  "/logoStyles/emblem_logos.png",
  "/logoStyles/negative_space_logos.png",
];

function Style() {
  const { logoStyle, setLogoStyle, removeLogoStyle } = useFormData();

  return (
    <div>
      <div className="py-4">
        <h1 className="text-xl font-bold lg:text-3xl">
          Select Logo Style that matches your brand
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full mx-auto">
        {logos.map((style: string, i) => (
          <div
            key={i}
            onClick={() => {
              const index = logoStyle.findIndex((f: String) => f === style);
              if (index > -1) {
                removeLogoStyle(style);
              } else {
                setLogoStyle(style);
              }
            }}
            className={cn(
              logoStyle.includes(style)
                ? "border-4 border-[#2F2FA2]"
                : "border-4 border-transparent ",
              " hover:cursor-pointer transition flex justify-center items-center bg-gray-200 outline-none hover:scale-[102%] overflow-hidden rounded-[14px] min-w-[170px]"
            )}
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                fill
                key={i}
                src={style}
                alt="logo"
                sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
                priority
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Style;
