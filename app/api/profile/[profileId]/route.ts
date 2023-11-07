import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, bio } = await req.json();

    if (profile.id !== params.profileId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profileData = await db.profile.update({
      where: { id: profile.id },
      data: { name, bio },
    });

    return NextResponse.json(profileData);
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
