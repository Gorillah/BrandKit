import { logos } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { Metadata } from "next";
import { checkSubscription } from "@/lib/subscription";
import LogoNavbar from "@/components/LogoNavbra";

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

  const logoData = {
    logoId: logoSelect[0].id.toString(), // Assuming id is a number and needs to be converted to string
    companyName: logoSelect[0].companyName,
    logoUrl: logoSelect[0].logoUrl,
    logoPublicId: logoSelect[0].logoPublicId, // Assuming this property exists in logoSelect[0]
    logoFormat: logoSelect[0].logoFormat,
  };

  return (
    <div className="min-h-screen">
      <LogoNavbar {...logoData} isSub={isSub} />
      <div className="container flex items-center justify-center mt-24">
        <Logo
          logoUrl={logoData.logoUrl}
          companyName={logoData.companyName}
          logoId={logoData.logoId}
          isSub={isSub}
        />
      </div>
    </div>
  );
};

export default LogoPage;
