"use server";

import getAllUsers from "@/lib/getAllUsers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await getAllUsers();
  return NextResponse.json(users);
}
