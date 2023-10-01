// import getAllUsers from "@/lib/getAllUsers";
import { NextRequest, NextResponse } from "next/server";
import generateImage from "@/lib/generateLogo";

export async function POST(request: NextRequest) {
  try {
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

    // return NextResponse.json({
    //   company: body.company,
    //   fontStyle,
    //   logoStyle,
    //   logoColor,
    // });

    const res = await generateImage(
      body.company,
      logoStyle,
      logoColor,
      fontStyle
    );

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
