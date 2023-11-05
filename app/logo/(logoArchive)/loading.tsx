import React from "react";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    </div>
  );
}
