"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import React from "react";
import lottieJson from "@/public/animation_lngjrw7e.json";
import { CldImage } from "next-cloudinary";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { db } from "@/lib/db";
import { logos } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "./ui/use-toast";

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

const Logo = ({ id, logoUrl, companyName, logoPublicId, logoFormat }: logo & Subscription) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const mutation = useMutation(
    () => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          if (!logoPublicId) {
            router.refresh();
            reject(new Error("No logoPublicId"));
          } else {
            resolve(true);
            clearTimeout(timer);
          }
        }, 1500);
      });
    },
    {
      onMutate: () => {
        console.log(logoPublicId);
      },
      retry: (failureCount, error) => failureCount < 5 && (!logoPublicId || logoPublicId === ""),
    }
  );

  useEffect(() => {
    mutation.mutate();
  }, [logoPublicId]);

  if (mutation.isLoading) {
    return <Loader2 className="animate-spin" size={40} />;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {mutation.isSuccess && (
        <CldImage
          width={500}
          height={500}
          src={logoPublicId!}
          alt={companyName}
          overlays={[
            {
              position: {
                gravity: "center",
              },
              text: {
                color: "black",
                fontFamily: "Source Sans Pro",
                fontSize: 50,
                fontWeight: "black",
                text: "IS LIFE",
              },
            },
          ]}
          priority
        />
      )}
    </div>
  );
};
export default Logo;
