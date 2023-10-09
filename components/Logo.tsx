"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import WatermarkLogo from "@/components/watermark";
import Lottie from "react-lottie-player";
import React from "react";
import lottieJson from "@/public/animation_lngjrw7e.json";
import { useRouter } from "next/navigation";

type Props = {
  logoUrl: string;
  companyName: string;
  logoId: string;
  isSub: boolean;
};

const Logo = ({ logoUrl, companyName, logoId, isSub }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    <div>
      {loading ? (
        <div>
          <Lottie loop={true} play={true} animationData={lottieJson} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
            <WatermarkLogo
              isSub={isSub}
              logoId={logoId}
              logoUrl={logoUrl}
              companyName={companyName}
            />
        </div>
      )}
    </div>
  );
};

export default Logo;
