import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/actions/auth";

export async function GET(request: NextRequest) {
    const session = await getSession();
    return NextResponse.json(session);
}