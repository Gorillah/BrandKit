"use client";

import { ArrowDownToLine, ArrowLeft, Menu } from "lucide-react";
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
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import QualitySlider from "@/components/QualitySlider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useDownloader from "react-use-downloader";
import axios from "axios";

type Props = {
  logoUrl: string;
  companyName: string;
  logoId: string;
  isSub: boolean;
};

export default function LogoNavbar({
  logoUrl,
  companyName,
  logoId,
  isSub,
}: Props) {
  const { download } = useDownloader();
  const router = useRouter();
  let url = logoUrl;
  let id = "";
  if (logoUrl.length === 0) router.push("/");
  if (url.includes("http://res.cloudinary.com")) {
    const regex = /\/logos\/(.*)/;
    const match = url.match(regex);
    const s1 = match[0].split(".png")[0];
    id = s1.substring(1);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      if (!isSub) {
        const res = await axios.get("/api/stripe");
        window.location.href = res.data.url;
      }
      console.log("downloading");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [quality, setQuality] = useState([525]); // Keep as an array
  const [watermark, setWatermark] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(watermark);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        if (logoUrl.includes("http://res.cloudinary.com")) {
          setLoading(false);
        } else {
          router.refresh();
        }
      }, 1500);
    }
  }, [loading, logoUrl]);

  return (
    <>
      <div className="px-4 h-16 bg-primary flex items-center justify-between">
        <Sheet>
          <SheetTrigger>
            <Menu color="white" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <ArrowDownToLine color="white" />
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <div className="flex flex-col mb-10">
              <SheetHeader className="flex flex-col gap-4">
                <SheetTitle>Download</SheetTitle>
                <Label htmlFor="quality">Quality</Label>
                <QualitySlider quality={quality} setQuality={setQuality} />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watermark"
                    onCheckedChange={() => setWatermark(!watermark)}
                    checked={watermark}
                  />
                  <Label htmlFor="watermark">Remove Watermark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </SheetHeader>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Download</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="container mx-auto py-6">
        <Link href={"/logo"}>
          <ArrowLeft />
        </Link>
      </div>
    </>
  );
}
