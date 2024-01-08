import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, bio } = await req.json();

    const profileData = await db.user.update({
      where: { id: session.user.id },
      data: { name, bio },
    });

    return NextResponse.json(profileData);
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
