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
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Login",
    href: "/sign-in",
    authReq: false,
  },
  {
    label: "Regiester",
    href: "/sign-up",
    authReq: false,
  },
  {
    label: "My Logos",
    href: "/logo",
    authReq: true,
  },
  {
    label: "Faq",
    href: "/#faq",
    authReq: false,
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

export default function Navbar() {
  const { userId } = auth();
  return (
    <div className="h-16 flex size-icon px-4 shadow-md bg-primary justify-between items-center">
      <div
        className={cn(
          "md:hidden text-lg flex items-center",
          userId ? "" : "order-2"
        )}
      >
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white" size={32} />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="flex flex-col gap-2 pt-20 text-lg"
          >
            {routes.map((route, i) => (
              <div
                className={cn(
                  userId && route.label === "Login" ? "hidden" : "",
                  userId && route.label === "Regiester" ? "hidden" : "",
                  !userId && route.authReq ? "hidden" : ""
                )}
                key={i}
              >
                <SheetClose asChild>
                  <Link href={route.href}>{route.label}</Link>
                </SheetClose>
              </div>
            ))}
          </SheetContent>
        </Sheet>
      </div>
      <Link
        className="text-white relative w-36 h-full justify-start"
        href={"/"}
      >
        <Image
          src="/brandkit_01.webp"
          className={cn(
            "flex justify-center items-center",
            userId && "order-1"
          )}
          alt="BrandKit Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 500px) 50vw, 33vw"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Link>
      <HeaderMenu />
      <div className="hidden md:flex text-black justify-end">
        {!userId ? (
          <div className="flex gap-2">
            <Link href={"/sign-in"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant={"secondary"}>Regie</Button>
            </Link>
          </div>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
      <div className={cn(userId ? "flex" : "hidden")}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
