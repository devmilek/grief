import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; ingredientId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const recipe = await db.recipe.update({
      where: {
        profileId: profile.id,
        id: params.recipeId,
      },
      data: {
        ingredients: {
          delete: {
            id: params.ingredientId,
          },
        },
      },
    });
    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[INGREDIENT DELETE]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
