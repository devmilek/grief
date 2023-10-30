import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const recipe = await db.recipe.create({
      data: {
        name,
        profileId: profile.id,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[RECIPE POST]", e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
