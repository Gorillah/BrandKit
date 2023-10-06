"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

type Props = {
  logoUrl: string;
  companyName: string;
  logoId: string;
};

const Logo = ({ logoUrl, companyName, logoId }: Props) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true)
      console.log("components/logo.tsx", logoId)
      const response = await axios.post("/api/stripe", logoId)
      window.location.href = response.data.url
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <Link href={"/logo"}>
          <ArrowLeft />
        </Link>
      </div>
      <Image
        src={logoUrl}
        alt=""
        width={500}
        height={500}
        priority
        className="shadow-md shadow-gray-400"
      />
      <div className="flex gap-2 justify-between">
        <Button>
          Download Free
        </Button>
        <Button
          onClick={handlePayment}
          variant={"secondary"}
        >
          Download Premium
        </Button>
      </div>
    </div>
  );
}

export default Logo;
