import { logos } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { Metadata } from "next";
import { checkSubscription } from "@/lib/subscription";

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
        eq(logos.userId, userId), // Created by current user
      ),
    );
  const logo = logoSelect[0];
  return (
    <div className="min-h-screen container flex items-center justify-center">
      <Logo
        logoUrl={logo.logoUrl}
        companyName={logo.companyName}
        logoId={logoId}
        isPaid={logo.isPaid}
        isSub={isSub}
      />
    </div>
  );
};

export default LogoPage;
