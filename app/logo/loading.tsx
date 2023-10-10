import React from "react";
import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className=" flex justify-center items-center w-full h-full">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );
}
