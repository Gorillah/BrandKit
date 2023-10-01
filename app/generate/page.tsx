"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useFormData } from "@/store/createLogo";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Generate() {
  const formData = useFormData();
  const router = useRouter();

  async function logoGeneration() {
    const res = axios.post("http://localhost:3000/api/create");
  }

  useEffect(() => {
    if (
      !formData.fontStyle.length ||
      !formData.logoStyle.length ||
      !formData.logoColor.length
    ) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <div className="container h-20 flex items-center size-icon justify-between shadow-md mb-18"></div>
    </div>
  );
}
