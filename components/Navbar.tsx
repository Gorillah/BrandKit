import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HeaderMenu from "@/components/HeaderMenu";

export default function Navbar() {
  const routes = [
    {
      label: "My Logos",
      href: "/logo",
      authReq: true,
    },
    {
      label: "Faq",
      href: "/#faq",
      authReq: true,
    },
    {
      label: "Price",
      href: "/#price",
      authReq: false,
    },
    {
      label: "Help",
      href: "/help",
      authReq: false,
    },
  ];

  const { userId } = auth();
  return (
    <div className="h-16 flex size-icon p-4 shadow-md bg-primary justify-between">
      <Link
        className="text-white relative w-36 h-8 py-2 justify-start"
        href={"/"}
      >
        <Image
          src="/brandkit_01.webp"
          className="flex justify-center items-center"
          alt="BrandKit Logo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Link>
      <HeaderMenu />
      <div className="hidden md:flex text-black justify-end w-36">
        {!userId ? (
          <div className="flex gap-2">
            <Link href={"/sign-in"}>
              <Button variant={"outline"}>Sign in</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant={"secondary"}>Sign up</Button>
            </Link>
          </div>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
      <div className="md:hidden text-lg flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white" />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-2 pt-20 text-lg">
            {routes.map((route, i) => (
              <SheetClose asChild key={i}>
                <Link href={route.href}>{route.label}</Link>
              </SheetClose>
            ))}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
