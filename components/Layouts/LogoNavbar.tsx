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
import { useState } from "react";
import Link from "next/link";
import useDownloader from "react-use-downloader";
import { users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default function LogoNavbar({
  isSub,
  logoUrl,
  companyName,
  logoPublicId,
  logoFormat,
  userId,
}: logo & Subscription): JSX.Element {
  const { download } = useDownloader();
  const [isLoading, setIsLoading] = useState(false);

  // const freeDownload =
  //   "https://res.cloudinary.com/dkarnkl8i/image/upload/l_ztql9qubcewi4c0eypup/e_screen,fl_layer_apply,g_center/c_fit,h_525,w_525/" +
  //   logoPublicId;

  const handlePayment = async () => {
    // try {
    // setIsLoading(true);
    // if (!isSub) {
    //   // const res = await axios.get("/api/stripe");
    //   // window.location.href = res.data.url;
    //   await db
    //     .update(users)
    //     .set({
    //       credit: sql`credit - 1`,
    //     })
    //     .where(eq(users.id, userId));
    //   return download(downloadUrl, companyName + "." + logoFormat);
    // } else {
    //   const user = await db.select().from(users).where(eq(users.id, userId));
    //   if (!user[0] === undefined || null) return;
    //   if (user[0].credit! <= 0)
    //     return NextResponse.json("Not enough credits", { status: 500 });
    //   await db
    //     .update(users)
    //     .set({
    //       credit: sql`credit - 1`,
    //     })
    // .where(eq(users.id, userId));
    return download(downloadUrl, companyName + "." + logoFormat);
    // }
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const [quality, setQuality] = useState([525]); // Keep as an array
  const downloadUrl = `https://res.cloudinary.com/dkarnkl8i/image/upload/c_fit,h_${quality[0]},w_${quality[0]}/${logoPublicId}`;
  // const [loading, setLoading] = useState(true);
  console.log(downloadUrl);

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
          <SheetTrigger className="bg-white py-2 px-4 rounded-md">
            <ArrowDownToLine color="blue" />
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <div className="flex flex-col mb-10">
              <SheetHeader className="flex flex-col container">
                <SheetTitle>Download</SheetTitle>
                {/* <Label htmlFor="quality" className="text-md text-left">
                  Quality
                </Label> */}
                <QualitySlider
                  quality={quality}
                  setQuality={setQuality}
                  isSub={isSub}
                />
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
