import { db } from "@/lib/db"; // Your Drizzle ORM setup
import { users } from "@/db/schema"; // Your table schema
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export default async function resetColumn(req: NextApiRequest, res: NextResponse) {
  // Check for a secret key for security
  if (req.headers["x-secret-key"] !== process.env.RESET_SECRET_KEY) {
    return NextResponse.json("Forbidden", { status: 403 });
  }

  try {
    await db
      .update(users)
      .set({
        dailyLogoCount: 0, // default to 0 every 24 hours
      })
      .execute();

    return NextResponse.json("Column reset successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Error resetting how many logo was generated column", { status: 500 });
  }
}
