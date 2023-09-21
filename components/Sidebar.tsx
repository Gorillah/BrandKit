"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="relative w-8 h-8"> <Image src="/public/ArticleJet.webp" alt="Logo" fill /></div>
                    <h1>AI LOGO</h1>
                </Link>
            </div>
        </div>
    )
}