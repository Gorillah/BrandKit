import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { logos } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Logos from "@/components/logos";
import AddLogo from "@/components/AddLogo";
import Navbar from "@/components/Navbar";
import { checkSubscription } from "@/lib/subscription";

export default async function Logo() {
  const { userId } = auth();
  // parse to string
  if (!userId) return redirect("/");
  const logoSelect = await db.select().from(logos).where(
    eq(logos.userId, userId) // Logos created by current user
  );
  const isSub = await checkSubscription();
  return (
    <div>
      <Navbar />
      <div className="container grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
        <AddLogo />
        {logoSelect.map((logo, i) => (
          <Logos {...logo} isSub={isSub} key={i} />
        ))}
      </div>
    </div>
  );
}
