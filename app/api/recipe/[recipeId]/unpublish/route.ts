import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: profile.id,
      },
      data: {
        published: false,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
