import useDownloader from "react-use-downloader";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type result = {
  logoUrl: string;
  companyName: string;
  logoId: string;
  isSub: boolean;
};

export function WatermarkLogo({
  isSub,
  logoId,
  logoUrl,
  companyName,
}: result): JSX.Element {
  const router = useRouter();
  let url = logoUrl;
  let id = "";
  if (logoUrl.length === 0) router.push("/");
  if (
    url.includes(
      "http://res.cloudinary.com" ||
        "https://res.cloudinary.com" ||
        "res.cloudinary"
    )
  ) {
    const regex = /\/logos\/(.*)/;
    const match = url.match(regex);
    const s1 = match[0].split(".png")[0];
    id = s1.substring(1);
  }

  return (
    <div>
      {url.includes(
        "http://res.cloudinary.com" ||
          "https://res.cloudinary.com" ||
          "res.cloudinary"
      ) && (
        <div className="max-w-sm">
          <CldImage
            width={500}
            height={500}
            src={id}
            alt={companyName}
            priority
          />
        </div>
      )}
    </div>
  );
}

export default WatermarkLogo;
