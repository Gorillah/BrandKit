import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

const routes = [
    {
        label: "Dashboard",
        href: "/aa",
        icon: Menu
    },
    {
        label: "Dashboard",
        href: "?route=dashboardx",
        icon: Menu
    },
    {
        label: "Dashboard",
        href: "/xa",
        icon: Menu
    },
]


export default function Navbar() {
    const {userId} = auth();
    return (
        <div className="h-16 flex items-center size-icon p-4 justify-between shadow-md">
            <Link href={"/"}>
                LOGO
            </Link>
            <div className="hidden md:flex">
                {routes.map((route) => (
                    <Link key={route.href} href={route.href}>
                        <Button variant={"link"}>{route.label}</Button>
                    </Link>
                ))}
            </div>
            <div className="hidden md:flex">
                {!userId ? (
                    <div className="flex gap-2">
                        <Link href={"/sign-in"}>
                            <Button variant={"outline"}>Sign in</Button>
                        </Link>
                        <Link href={"/sign-up"}>
                            <Button>Sign up</Button>
                    </Link>
                    </div>
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
            <div  className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                       <Menu/>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col gap-1">
                            <Link href={"/s"}>
                                <Button variant={"link"}>LOGO</Button>
                            </Link>
                            <Link href={"/s"}>
                                <Button variant={"link"}>LOGO</Button>
                            </Link>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}