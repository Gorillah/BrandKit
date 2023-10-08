"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import HeaderMenu from "@/components/HeaderMenu";



export default function Navbar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center space-x-2 mb-14">
          <div className="relative w-8 h-8">
            <Image src="/logo-placeholder-image.png" alt="Logo" fill />
          </div>
        </Link>
        <div className="space-y-1">
         <HeaderMenu />
        </div>
      </div>
    </div>
  );
}
