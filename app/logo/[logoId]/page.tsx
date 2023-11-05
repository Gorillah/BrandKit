import { logos } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { Metadata } from "next";
import { checkSubscription } from "@/lib/subscription";
import LogoNavbar from "@/components/Layouts/LogoNavbar";

export const metadata: Metadata = {
  title: "Logo Maker",
  description: "Generate your perfect logo simply with BrandKit",
};

type Props = {
  params: {
    logoId: string;
  };
};

const LogoPage = async ({ params: { logoId } }: Props) => {
  const isSub = await checkSubscription();
  const { userId } = auth();
  if (!userId) return redirect("/");

  // Get Selected Logo with Id, and UserId
  const logoSelect = await db
    .select()
    .from(logos)
    .where(
      and(
        eq(logos.id, parseInt(logoId)), // Id matches
        eq(logos.userId, userId) // Created by current user
      )
    );

  return (
    <div className="min-h-screen">
      <LogoNavbar {...logoSelect[0]} isSub={isSub} />
      <div className="container flex items-center justify-center mt-24">
        <Logo {...logoSelect[0]} isSub={isSub} />
      </div>
    </div>
  );
};

export default LogoPage;
