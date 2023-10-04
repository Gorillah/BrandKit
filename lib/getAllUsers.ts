import { db } from "@/lib/db";
import { users } from "@/db/schema";

export default async function getAllUsers() {
  const results = await db.select().from(users);
  return results;
}
