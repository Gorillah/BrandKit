import { db } from "@/lib/db"; // Your Drizzle ORM setup
import { users } from "@/drizzle/schema"; // Your table schema
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { headers } from "next/headers";

export async function GET(req: NextApiRequest, res: NextResponse) {
  // Check for a secret key for security
  const headersList = headers();
  const secret = headersList.get("reset-secret");
  console.log(secret);
  if (secret !== process.env.RESET_SECRET_KEY) {
    return NextResponse.json("Forbidden", { status: 403 });
  }

  try {
    await db
      .update(users)
      .set({
        credit: 0,
      })
      .execute();
    console.log("column reset successfully");
    return NextResponse.json("All Accounts Credits has been reset", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("Error resetting how many credits column", {
      status: 500,
    });
  }
}
