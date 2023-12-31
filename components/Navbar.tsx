import {
  BadgeHelp,
  ChevronRightCircle,
  CircleDollarSign,
  Crown,
  HelpCircle,
  KanbanSquare,
  LogIn,
  Menu,
  Shapes,
  UserCircle2,
  UserPlus2,
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
import HeaderMenu from "@/components/Layouts/HeaderMenu";
import { cn } from "@/lib/utils";
import { checkSubscription } from "@/lib/subscription";
import { userSubscriptions, users } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";

let stripeUrl: string = "null";
const routes = [
  {
    label: "Login",
    href: "/sign-in",
    img: UserCircle2,
    authReq: false,
  },
  {
    label: "Register",
    href: "/sign-up",
    img: UserCircle2,
    authReq: false,
  },
  {
    label: "My Logos",
    href: "/logo",
    img: Shapes,
    authReq: true,
  },
  {
    label: "My Subscriptions",
    href: stripeUrl,
    img: KanbanSquare,
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

export default async function Navbar() {
  const { userId } = auth();
  const isSubscribed = await checkSubscription();
  let credit = null;
  if (userId) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId!.toString()));
    credit = user[0]?.credit;
    const subscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));
    if (subscription[0]?.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: subscription[0].stripeCustomerId,
        return_url: `${process.env.NEXT_BASE_URL}/success`,
      });

      stripeUrl = session.url;
    }
  }
  console.log("stripeUrl", stripeUrl === "null");
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
              <SheetClose
                asChild
                key={i}
                className={cn(
                  "hover:bg-gray-200 py-2 pl-1 rounded-md font-semibold border-b-2",
                  userId && route.label === "Login" ? "hidden" : "",
                  userId && route.label === "Register" ? "hidden" : "",
                  !userId && route.authReq ? "hidden" : "",
                  route.label === "My Subscriptions" && stripeUrl === "null"
                    ? "hidden"
                    : "flex"
                )}
              >
                <Link href={route.href}>
                  <div className="flex items-center gap-2">
                    <route.img />
                    <div>{route.label}</div>
                  </div>
                </Link>
              </SheetClose>
            ))}
            {credit && (
              <div className="mt-auto font-semibold">Credits: {credit}</div>
            )}
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
          rel="preload"
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
          <div className="relative flex items-center justify-center gap-3">
            {/* lg screen view */}
            {credit && (
              <div className="font-semibold text-white">Credits: {credit}</div>
            )}
            <UserButton afterSignOutUrl="/" />
            {isSubscribed && (
              <Crown
                color="blue"
                className="absolute h-5 w-5 rounded-full bg-white border-2 top-[-10px] right-[-5px]"
              />
            )}
          </div>
        )}
      </div>
      {/* mobile view */}
      <div className={cn(userId ? "flex" : "hidden", "md:hidden relative")}>
        <UserButton afterSignOutUrl="/" />
        {isSubscribed && (
          <Crown
            color="blue"
            className="absolute h-5 w-5 rounded-full bg-white border-2 top-[-10px] right-[-5px]"
          />
        )}
      </div>
    </div>
  );
}
