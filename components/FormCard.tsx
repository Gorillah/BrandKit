"use client";

import { Button } from "@/components/ui/button";
import Style from "@/components/form-steps/LogoStyle";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Color from "@/components/form-steps/ColorScheme";
import Font from "@/components/form-steps/FontStyle";
import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";
import { useProgressBar } from "@/store/createLogo";
import { useFormPage } from "@/store/createLogo";
import { useFormData } from "@/store/createLogo";
import { useToast } from "@/components/ui/use-toast";
import querystring from "querystring";
import axios from "axios";

export default function FormCard() {
  const router = useRouter();

  async function createLogo() {
    // router.push('/create')
    // const response = await axios.post(
    //   "http://localhost:3000/api/create",
    //   formData
    // );
    // console.log(response.data);
  }

  const { progress, setProgress } = useProgressBar();
  const { page, setPage } = useFormPage();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const {
    company,
    logoStyle,
    logoColor,
    fontStyle,
    removeAllLogoStyles,
    removeAllLogoColors,
    removeAllFontStyles,
    clearCompany,
  } = useFormData();

  console.log(page);

  useEffect(() => {
    removeAllFontStyles();
    removeAllLogoColors();
    removeAllLogoStyles();
    clearCompany();
  }, []);

  const next = function () {
    if (page > 1) router.push("/generate");
    if (page === 0 && logoStyle.length === 0) {
      toast({
        title: "Please select at least one style",
      });
      return;
    } else if (page === 1 && logoColor.length === 0) {
      toast({
        title: "Please select at least one color",
      });
      return;
    }
    setPage(page + 1);
    setProgress(progress + 33.3);
  };

  const pages = [<Style key={0} />, <Color key={1} />, <Font key={2} />];

  return (
    <div className="form flex flex-col space-y-4">
      <Progress value={progress} className="w-full" />
      <div className="flex flex-col container">
        <div className="transition transform duration-500 slide-in-left">
          {pages[page]}
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 right-0 mx-auto pb-2">
          <Button
            className="h-14 text-lg w-40 lg:w-[500px] bg-[#F64C72]"
            onClick={() => {
              if (page === 2 && fontStyle.length === 0) {
                toast({
                  title: "Please select at least one font",
                });
                return;
              }
              if (page > 1) {
                createLogo();
              }
              next();
            }}
          >
            {page === 2 ? "Generate" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
