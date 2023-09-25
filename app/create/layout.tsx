import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { UserButton, auth } from '@clerk/nextjs';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();
  return (
        <div>
            <div className="h-16 flex items-center size-icon p-4 justify-between shadow-md">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                {userId && (
                  <UserButton />
                )}
            </div>
            {children}
        </div>
  )
}
