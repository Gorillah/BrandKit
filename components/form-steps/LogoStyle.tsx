import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFormData } from "@/store/createLogo";

const logos = [
  "/logoStyles/combination_mark_logos.webp",
  "/logoStyles/wordmark_logos.webp",
  "/logoStyles/lettermark_logos.webp",
  "/logoStyles/monogram_logos.webp",
  "/logoStyles/letterform_logos.webp",
  "/logoStyles/abstract_logos.webp",
  "/logoStyles/mascot_logos.webp",
  "/logoStyles/emblem_logos.webp",
  "/logoStyles/negative_space_logos.webp",
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto">
        {logos.map((style: string, i) => (
          <div
            key={i}
            onClick={() => {
              const index = logoStyle.findIndex(
                (f: String) => f === style
              );
              if (index > -1) {
                removeLogoStyle(style);
              } else {
                setLogoStyle(style);
              }              
            }}
            className={cn(
              logoStyle.includes(style)
                ? 'border-4 border-green-500' : 'border-4 border-transparent ', ' hover:cursor-pointer transition py-10 px-5 md:p-20 flex justify-center items-center bg-gray-200 outline-none hover:scale-[102%] overflow-hidden rounded-[14px]'
            )}
          >
            <Image
              width={431}
              height={279}
              key={i}
              src={style}
              alt="logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Style;
