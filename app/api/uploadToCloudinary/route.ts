import { logos } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const logo = await db
      .select()
      .from(logos)
      .where(eq(logos.id, parseInt(id)));
    if (!logo[0].logoUrl)
      return NextResponse.json("Not found", { status: 404 });

    const formData = new FormData();
    formData.append("file", logo[0].logoUrl);
    formData.append("upload_preset", "BrandKit");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkarnkl8i/image/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.warn(res.data);

    await db
      .update(logos)
      .set({
        logoUrl: res.data.secure_url,
        logoPublicId: res.data.public_id,
        logoFormat: res.data.format,
      })
      .where(eq(logos.id, parseInt(id)));
    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
