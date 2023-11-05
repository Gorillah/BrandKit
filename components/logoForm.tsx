"use client";

import { Button } from "@/components/ui/button";

import Style from "@/components/logo_form/Style";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Color from "@/components/logo_form/Color";
import Font from "@/components/logo_form/Font";
import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";
import { useProgressBar } from "@/store/createLogo";
import { useFormPage } from "@/store/createLogo";
import { useFormData } from "@/store/createLogo";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Lottie from "react-lottie-player";
import lottieJson from "@/public/animation.json";

export default function FormCard({ credit }: { credit: number | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const { toast } = useToast();
  const { progress, setProgress } = useProgressBar();
  const { page, setPage } = useFormPage();
  const {
    logoStyle,
    logoColor,
    fontStyle,
    removeAllLogoStyles,
    removeAllLogoColors,
    removeAllFontStyles,
    clearCompany,
  } = useFormData();

  // Reset input when page reloads
  useEffect(() => {
    removeAllFontStyles();
    removeAllLogoColors();
    removeAllLogoStyles();
    clearCompany();
    setPage(0);
    setProgress(33);
  }, []);

  const uploadToCloudinary = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.post("/api/uploadToCloudinary", {
        id,
      });
      return response.data;
    },
  });
  const createLogo = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/create", {
        company: searchParams.get("company"),
        logoStyle,
        logoColor,
        fontStyle,
      });
      return res.data;
    },
  });

  const handleSubmit = async () => {
    createLogo.mutate(undefined, {
      onSuccess: async ({ id }) => {
        uploadToCloudinary.mutate(id);
        await router.push(`/logo/${id}`);
      },
      onError: (error: any) => {
        console.warn(error);
      },
    });
  };

  if (!company) {
    router.push("/");
  }

  // Pagination + next button
  const next = async function () {
    switch (page) {
      case 0:
        if (logoStyle.length === 0) {
          toast({
            title: "Please select at least one style",
          });
        } else {
          setPage(page + 1);
          setProgress(progress + 33.3);
        }
        break;
      case 1:
        if (logoColor.length === 0) {
          toast({
            title: "Please select at least one color",
          });
        } else {
          setPage(page + 1);
          setProgress(progress + 33.3);
        }
        break;
      case 2:
        if (fontStyle.length === 0) {
          toast({
            title: "Please select at least one font",
          });
        } else {
          // console.log('USED CREDIT', credit);
          // const res = await UseCredit();
          if (credit <= 0 || null || undefined) {
            toast({
              title: "Error",
              description: "You don't have enough credits",
            });
            break;
          }
          handleSubmit();
          break;
        }
        break;
    }
  };

  const back = function () {
    if (page < 1) router.push("/");
    setPage(page - 1);
    setProgress(progress - 33.3);
  };

  const pages = [<Style key={0} />, <Color key={1} />, <Font key={2} />];

  return (
    <div className="h-screen">
      <div className="container h-20 flex items-center size-icon justify-between mb-18">
        <Button
          variant={"link"}
          onClick={() => {
            back();
          }}
        >
          <ArrowLeft />
        </Button>
        <span className="text-md">Credits: {credit}</span>
      </div>
      <div className="form flex flex-col space-y-4 pb-20">
        <Progress value={progress} className="w-full" />
        {!createLogo.isLoading && (
          <div className="flex flex-col container">
            <div className="transition transform duration-500 slide-in-left">
              {pages[page]}
            </div>
            {page < 3 && (
              <div className="flex justify-center fixed bottom-0 left-0 right-0 mx-auto pb-2">
                <Button
                  variant={"default"}
                  className={cn(
                    "h-14 text-lg w-40 lg:w-[500px] shadow-gray-400 shadow-xl",
                    createLogo.isLoading && "hidden"
                  )}
                  onClick={() => {
                    next();
                  }}
                  disabled={createLogo.isLoading}
                >
                  {createLogo.isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {page === 2 ? "Generate" : "Next"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {createLogo.isLoading && (
        <div className="flex flex-col justify-center items-center">
          <div>
            <Lottie
              className="w-20 h-20"
              loop={true}
              play={true}
              animationData={lottieJson}
            />
          </div>
          <p>
            Logo generation started. Dont refresh! It can take up to 30-40
            seconds
          </p>
        </div>
      )}
    </div>
  );
}
