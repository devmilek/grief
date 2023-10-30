import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { email, password } = await req.json();
    if (!email || !password) {
      return new NextResponse("Missing email or password", { status: 400 });
    }

    const userExists = await db.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const user = await db.user.create({
      data: {
        email,
        userId,
      },
    });
  } catch (e) {
    console.error("[CREATE USER]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
