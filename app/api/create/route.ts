import getAllUsers from "@/lib/getAllUsers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const style = body.style.map((style: string) => {
    return style.split('/').pop()?.split('.').slice(-2, -1).join('.')
  })

  const font = body.font.map((font: string) => {
    return font.split('/').pop()?.split('.').slice(-2, -1).join('.')
  })

  const color = body.color.map((color: string) => {
    return color.split('/').pop()?.split('.').slice(-2, -1).join('.')
  })

  const users = await getAllUsers();
  return NextResponse.json({
    font,
    color,
    style,
    company: body.company
  });
}
