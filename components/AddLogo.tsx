"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddLogo = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/")} className="w-full h-full" variant={"outline"}>
      <Plus size={80} />
    </Button>
  );
};

export default AddLogo;
