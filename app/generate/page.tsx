"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useFormData } from "@/store/createLogo";
import { useRouter } from "next/navigation";
import axios from "axios";

import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function Generate() {
  const formData = useFormData();
  const router = useRouter();
  const uploadFile = async () => {
    const fileRef = ref(
      storage,
      "gs://brandkit-74ae6.appspot.com/Fiero1696493494328.jpg",
    );
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);
    // use url
  };

  async function logoGeneration() {
    const res = axios.post("/api/create");
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
