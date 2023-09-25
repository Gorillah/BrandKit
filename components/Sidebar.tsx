"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { LayoutDashboard } from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    }, 
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    }, 
]
    

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["600"],
})

export default function Navbar() {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center space-x-2 mb-14">
                    <div className="relative w-8 h-8">
                        <Image src="/logo-placeholder-image.png" alt="Logo" fill />
                    </div>
                    <h1 className={cn("text-2xl", montserrat.className)}>AI LOGO</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                            <div className="flex flex-1 items-center">
                                <route.icon className={cn("w-5 h-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}