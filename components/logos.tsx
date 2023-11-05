"use client";

import React from "react";
import { redirect } from "next/navigation";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

type props = {
  id: number;
  companyName: string;
  dateGenerated: string | null;
  logoUrl: string;
  userId: string;
  logoPublicId: string | null;
  logoFormat: string | null;
};

type isSub = {
  isSub: boolean;
};

const Logos = ({ logoUrl, id, isSub }: props & isSub) => {
  const handleClick = () => {
    redirect(`/logo/${id}`);
  };
  console.log(isSub);
  return (
    <div>
      <Link href={`/logo/${id}`} key={id}>
        <AspectRatio ratio={1 / 1}>
          <CldImage
            src={logoUrl || ""}
            onClick={() => handleClick}
            className="col-span-2 row-start-2"
            key={id}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
            overlays={
              isSub
                ? []
                : [
                    {
                      position: {
                        gravity: "center",
                        angle: -20,
                      },
                      text: {
                        color: "rgb:52a4ff80",
                        fontFamily: "Source Sans Pro",
                        fontSize: 50,
                        fontWeight: "black",
                        text: "BrandKit",
                        stroke: true,
                        border: "1px_solid_rgb:2d0eff99",
                      },
                    },
                  ]
            }
          />
        </AspectRatio>
      </Link>
    </div>
  );
};

export default Logos;
