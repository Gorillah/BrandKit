"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import useDownloader from "react-use-downloader";

type Props = {
  logoUrl: string;
  companyName: string;
};

function Logo({ logoUrl, companyName }: Props) {
  console.log("ok: ", logoUrl);
  const { download } = useDownloader({
    mode: "no-cors",
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={logoUrl}
        alt=""
        width={500}
        height={500}
        priority
        className="outline outline-4 outline-black"
      />
      <div className="flex gap-2 justify-between">
        <Button onClick={() => download(logoUrl, companyName)}>
          Download Free
        </Button>
        <Button
          onClick={() => download(logoUrl, companyName)}
          variant={"secondary"}
        >
          Download Premium
        </Button>
      </div>
    </div>
  );
}

export default Logo;
