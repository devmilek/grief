import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; cuisineId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cuisine = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: profile.id,
      },
      data: {
        cuisines: {
          delete: {
            recipeId_cuisineId: {
              cuisineId: params.cuisineId,
              recipeId: params.recipeId,
            },
          },
        },
      },
    });

    return NextResponse.json(cuisine);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
