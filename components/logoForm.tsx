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
import { Loader2 } from "lucide-react";

export default function FormCard() {
  const router = useRouter();

  const { progress, setProgress } = useProgressBar();
  const { page, setPage } = useFormPage();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const {
    company,
    logoStyle,
    logoColor,
    fontStyle,
    setCompany,
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
  }, []);

  const uploadToFirebase = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.post("/api/uploadToFirebase", {
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
      onSuccess: ({ id }) => {
        uploadToFirebase.mutate(id);
        router.push(`/logo/${id}`);
      },
      onError: (error) => {
        window.alert(error);
      },
    });
  };

  // Pagination + next button
  const next = function () {
    if (page > 1) handleSubmit();
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
    <div className="form flex flex-col space-y-4 pb-20">
      <Progress value={progress} className="w-full" />
      <div className="flex flex-col container">
        <div className="transition transform duration-500 slide-in-left">
          {pages[page]}
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 right-0 mx-auto pb-2">
          <Button
            className="h-14 text-lg w-40 lg:w-[500px] shadow-gray-400 shadow-xl"
            variant={"default"}
            onClick={() => {
              if (page === 2 && fontStyle.length === 0) {
                toast({
                  title: "Please select at least one font",
                });
                return;
              }
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
      </div>
    </div>
  );
}
