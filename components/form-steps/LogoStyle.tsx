import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

function Style({ formData, setFormData }: any) {

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
              const index = formData.style.findIndex(
                (f: String) => f === style
              );
              if (index > -1) {
                setFormData({
                  ...formData,
                  style: formData.style.filter((f: String) => f !== style),
                });
              } else {
                setFormData({
                  ...formData,
                  style: [...formData.style, style],
                });
              }
            }}
            className={cn(
              formData.style.includes(style)
                ? "border-4 border-green-500 rounded-[14px] "
                : "border-4 border-transparent rounded-[14px]",
              " hover:cursor-pointer transition flex justify-center items-center bg-gray-200 outline-none rounded-lg hover:scale-[102%] overflow-hidden"
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
