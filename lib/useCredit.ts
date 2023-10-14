"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export default async function UseCredit() {
  const { userId } = auth();
  if (!userId) return false;
  const user = await db.select().from(users).where(eq(users.id, userId));
  const credit = user[0].credit!;
  if (credit === undefined || null || credit <= 0) return false;
  await db.update(users).set({
    credit: sql`credit - 1`,
  });
  return true;
}
