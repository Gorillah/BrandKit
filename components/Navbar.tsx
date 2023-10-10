import {
  BadgeHelp,
  CircleDollarSign,
  HelpCircle,
  LogIn,
  Menu,
  Shapes,
} from "lucide-react";
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
    img: LogIn,
    authReq: false,
  },
  {
    label: "Register",
    href: "/sign-up",
    img: LogIn,
    authReq: false,
  },
  {
    label: "My Logos",
    href: "/logo",
    img: Shapes,
    authReq: true,
  },
  {
    label: "Faq",
    href: "/#faq",
    img: HelpCircle,
    authReq: false,
  },
  {
    label: "Price",
    href: "/#price",
    img: CircleDollarSign,
    authReq: false,
  },
  {
    label: "Help",
    href: "/help",
    img: BadgeHelp,
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
            className="flex flex-col gap-y-2 pt-20 text-lg"
          >
            {routes.map((route, i) => (
              <SheetClose asChild key={i}>
                <Link href={route.href}>
                  <div
                    className={cn(
                      "flex items-center gap-2 hover:bg-gray-200 py-2 pl-1 rounded-md font-semibold",
                      userId && route.label === "Login" ? "hidden" : "",
                      userId && route.label === "Register" ? "hidden" : "",
                      !userId && route.authReq ? "hidden" : ""
                    )}
                  >
                    <route.img />
                    <div>{route.label}</div>
                  </div>
                </Link>
              </SheetClose>
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
              <Button variant={"secondary"}>Register</Button>
            </Link>
          </div>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
      <div className={cn(userId ? "flex" : "hidden", "md:hidden")}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
