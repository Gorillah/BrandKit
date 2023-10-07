"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { WatermarkImage } from "@/components/watermark";


import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

import React from "react";
import useDownloader from "react-use-downloader";

type Props = {
  logoUrl: string;
  companyName: string;
  logoId: string;
  isPaid: number;
};

const Logo = ({ logoUrl, companyName, logoId, isPaid }: Props) => {

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const fileUrl =
    'https://res.cloudinary.com/dkarnkl8i/image/fetch/v1696637993/https://firebasestorage.googleapis.com/v0/b/brandkit-74ae6.appspot.com/o/IstanbulGoodies1696602897743.jpg%3Falt%3Dmedia%26token%3Dab017fe2-8ec5-47bb-82cc-f84a1afc8a3b';
  const filename = 'beautiful-carpathia.jpg';

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (isPaid) {
      console.log("download");
      return;
    }
    try {
      setLoading(true);
      console.log("components/logo.tsx", logoId);
      const response = await axios.post("/api/stripe", logoId);
      window.location.href = response.data.url;
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <Link href={"/logo"}>
          <ArrowLeft />
        </Link>
      </div>
      <WatermarkImage logoUrl={logoUrl} />
      <div className="flex gap-2 justify-between">
        <Button>Download Free</Button>
        <Button onClick={handlePayment} variant={"secondary"}>
          Download Premium
        </Button>
      </div>
      <Button onClick={() => download(fileUrl, filename)}>
        {loading ? "Downloading..." : ""}
        Click to download the file
      </Button>
    </div>
  );
};

export default Logo;
