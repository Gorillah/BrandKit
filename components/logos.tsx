"use client";

import React, { PureComponent } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";

type Props = {
  logoUrl: string;
  id: number;
};

const Logos = ({ logoUrl, id }: Props) => {
  const handleClick = () => {
    redirect(`/logo/${id}`);
  };
  return (
    <div>
      <Link href={`/logo/${id}`} key={id}>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={logoUrl || ""}
            onClick={() => handleClick}
            className="col-span-2 row-start-2"
            key={id}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
          />
        </AspectRatio>
      </Link>
    </div>
  );
};

export default Logos;
