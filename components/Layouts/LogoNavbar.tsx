"use client";

import { ArrowDownToLine, ArrowLeft, Menu } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import QualitySlider from "@/components/QualitySlider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useDownloader from "react-use-downloader";
import axios from "axios";

type logo = {
  id: number;
  userId: string;
  companyName: string;
  dateGenerated: string | null;
  logoUrl: string;
  logoPublicId: string | null;
  logoFormat: string | null;
};

type Subscription = {
  isSub: boolean;
};

export default function LogoNavbar({
  isSub,
  logoUrl,
  companyName,
  logoPublicId,
  logoFormat,
}: logo & Subscription): JSX.Element {
  const { download } = useDownloader();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      if (!isSub) {
        const res = await axios.get("/api/stripe");
        window.location.href = res.data.url;
      } else {
        return download(logoUrl, companyName + "." + logoFormat);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [quality, setQuality] = useState([525]); // Keep as an array
  // const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="px-4 h-16 bg-primary flex items-center justify-between">
        <Link className="text-white relative w-36 h-8 justify-start" href={"/"}>
          <Image
            src="/brandkit_01.webp"
            className="flex justify-center items-center"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </Link>
        <Sheet>
          <SheetTrigger className="bg-white px-3 py-2 rounded-md">
            <ArrowDownToLine color="blue" />
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <div className="flex flex-col mb-10">
              <SheetHeader className="flex flex-col gap-4 container">
                <SheetTitle>Download</SheetTitle>
                <Label htmlFor="quality">Quality</Label>
                <QualitySlider quality={quality} setQuality={setQuality} />
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </SheetHeader>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handlePayment}>
                  Download
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="container mx-auto py-6 flex justify-between items-center">
        <Link href={"/logo"}>
          <ArrowLeft />
        </Link>
      </div>
    </>
  );
}
