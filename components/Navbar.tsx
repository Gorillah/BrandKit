import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Navbar() {
    return (
        <div className="h-14 flex items-center size-icon p-4">
            <Button className="md:hidden" variant={"ghost"}>
                <Menu />
            </Button>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}