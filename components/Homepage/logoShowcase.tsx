"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import { useEffect, useState } from "react";
import { LogoShowcaseArray } from "@/utils/LogoShowcaseArray";

export default function LogoShowcase() {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 gap-4">
      {LogoShowcaseArray.map((src, index) => (
        <div key={index}>
          <AspectRatio ratio={1 / 1}>
            <Image
              src={src}
              sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
              alt={"Logo"}
              fill
              placeholder="blur"
              className={
                index % 2 === 0 ? "col-span-2" : "col-span-2 row-start-2"
              }
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}
