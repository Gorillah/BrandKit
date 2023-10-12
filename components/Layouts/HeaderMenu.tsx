import { auth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HeaderMenu = () => {
  const { userId } = auth();

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

  return (
    <div className="hidden md:flex">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(userId === null && route.authReq == true ? "hidden" : "")}
        >
          <Button className="text-white text-lg" variant={"link"}>
            {route.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
