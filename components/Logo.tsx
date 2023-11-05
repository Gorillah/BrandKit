"use client";

import { useEffect, useState } from "react";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const Logo = ({
  id,
  logoUrl,
  companyName,
  logoPublicId,
  logoFormat,
  isSub,
}: logo & Subscription) => {
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
      retry: (failureCount, error) =>
        failureCount < 5 && (!logoPublicId || logoPublicId === ""),
    }
  );

  useEffect(() => {
    mutation.mutate();
  }, [logoPublicId]);

  if (mutation.isLoading) {
    return <Loader2 className="animate-spin" size={40} />;
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 shadow-md shadow-gray-400">
        {mutation.isSuccess && (
          <CldImage
            width={500}
            height={500}
            src={logoPublicId!}
            alt={companyName}
            overlays={
              isSub
                ? []
                : [
                    {
                      position: {
                        gravity: "center",
                        angle: -20,
                      },
                      text: {
                        color: "rgb:52a4ff80",
                        fontFamily: "Source Sans Pro",
                        fontSize: 50,
                        fontWeight: "black",
                        text: "BrandKit",
                        stroke: true,
                        border: "1px_solid_rgb:2d0eff99",
                      },
                    },
                  ]
            }
            priority
          />
        )}
      </div>
      {mutation.isSuccess && !isSub && (
        <div className="text-sm pt-4">
          <p>
            * Please upgrade to view and download the file without watermark
          </p>
          <p>* Free Users can download 525px and personal use license</p>
        </div>
      )}
    </div>
  );
};
export default Logo;
