// import getAllUsers from "@/lib/getAllUsers";
import { NextRequest, NextResponse } from "next/server";
import generateImage from "@/lib/generateLogo";
import { auth } from "@clerk/nextjs";
import { generateLogoPrompt } from "@/lib/openai";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  // if (!userId) {
  //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  // }
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
    fontStyle
  }
  
  const logo_description = await generateLogoPrompt(formData);
  console.log({ logo_description });
  
  return NextResponse.json(logo_description);
}
