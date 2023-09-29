import { NextRequest, NextResponse } from "next/server"
import { currentUser } from '@clerk/nextjs';

export async function POST(res: NextRequest) {
    const user = await currentUser();
    const payload = await res.json()
    return NextResponse.json({
        data: payload,
        user
    })
}