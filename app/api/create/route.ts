import { drizzle } from "drizzle-orm/planetscale-serverless";
// import getAllUsers from "@/lib/getAllUsers";
import { NextRequest, NextResponse } from "next/server";
import generateImage from "@/lib/generateLogo";
import { auth } from "@clerk/nextjs";
import { generateLogo, generateLogoPrompt } from "@/lib/openai";
import { db } from "@/lib/db";
import { logos } from "@/drizzle/schema";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const userIdString = String(userId);

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const logoStyle = body.logoStyle.map((style: string) => {
    return style.split("/").pop()?.split(".").slice(-2, -1).join(".");
  });

  const logoColor = body.logoColor.map((color: string) => {
    return color.split("/").pop()?.split(".").slice(-2, -1).join(".");
  });

  const fontStyle = body.fontStyle.map((font: string) => {
    return font.split("/").pop()?.split(".").slice(-2, -1).join(".");
  });

  const formData: formData = {
    company: body.company,
    logoStyle,
    logoColor,
    fontStyle,
  };

  // Generate logo description
  const logo_description = await generateLogoPrompt(formData);
  if (!logo_description) {
    return NextResponse.json(
      { error: "failed to generate logo description" },
      { status: 500 }
    );
  }

  // Generate logo using the description
  const logo_url = await generateLogo(logo_description);

  if (!logo_url) {
    return NextResponse.json(
      { error: "failed to generate logo" },
      { status: 500 }
    );
  }

  const logo = await db.insert(logos).values({
    userId: userIdString,
    companyName: formData.company,
    logoUrl: logo_url,
  });

  return NextResponse.json({
    id: logo.insertId,
  });
}
