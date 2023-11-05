import { userSubscriptions } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

const DAY_IN_MS = 0; //24 * 60 * 60 * 1000

export const checkSubscription = async () => {
  const { userId } = await auth();
  if (!userId) return false;

  const _userSubscriptions = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId));

  if (!_userSubscriptions[0]) return false;

  const userSubscription = _userSubscriptions[0];

  const isValid =
    userSubscription.stripeCustomerId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();
  return !!isValid;
};
