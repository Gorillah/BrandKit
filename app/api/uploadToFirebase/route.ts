import { logos } from "@/db/schema";
import { db } from "@/lib/db";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const logo = await db
      .select()
      .from(logos)
      .where(eq(logos.id, parseInt(id)));
    if (!logo[0].logoUrl) return NextResponse.json("Not found", { status: 404 });
    const firebase_url = await uploadFileToFirebase(
      logo[0].logoUrl,
      logo[0].companyName
    );
    await db
      .update(logos)
      .set({
        logoUrl: firebase_url,
      })
      .where(eq(logos.id, parseInt(id)));
    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
