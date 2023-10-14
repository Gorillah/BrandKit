import React from "react";
import FormCard from "@/components/logoForm";

import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

export default async function CreatePage() {
  // UseCredit
  const { userId } = auth();
  const user = await db.select().from(users).where(eq(users.id, userId!.toString()));
  const credit = user[0].credit;
  return (
    <div>
      <FormCard credit={credit} />
    </div>
  );
}
