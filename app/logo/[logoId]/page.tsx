// import { clerk } from "@/db/clerk.server";
import { logos } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  params: {
    logoId: string;
  };
};

const LogoPage = async ({ params: { logoId } }: Props) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  // Access clerk backend and get the user
  // const user = await clerk.users.getUser(userId);

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
    console.log(logoSelect)
  if (logoSelect.length != 1) return redirect("/");
  const logo = logoSelect[0];
  return (
    <div className="min-h-screen container flex items-center justify-center">
      <Image src={logo.logoUrl} alt="" width={500} height={500} />
    </div>
  );
};

export default LogoPage;
