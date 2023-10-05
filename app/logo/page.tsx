import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { logos } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Logos from "@/components/logos";
import AddLogo from "@/components/AddLogo"

export default async function Logo() {
  const { userId } = auth();
  // parse to string
  if (!userId) return redirect("/");
  const logoSelect = await db.select().from(logos).where(
    eq(logos.userId, userId) // Created by current user
  );
  return (
    <div className="container grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
      <AddLogo />
      {logoSelect.map((logo) => (
        <Logos key={logo.id} logoUrl={logo.logoUrl} id={logo.id} />
      ))}
    </div>
  );
}
