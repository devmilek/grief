import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { recipeId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.recipeId) {
      return new NextResponse("Missing recipeId", { status: 400 });
    }

    const {
      name,
      description,
      categoryId,
      servingAmount,
      servingType,
      difficulty,
      preparationTime,
    } = await req.json();

    if (
      !name ||
      !description ||
      !categoryId ||
      !servingAmount ||
      !servingType ||
      !difficulty ||
      !preparationTime
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const recipe = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: profile.id,
      },
      data: {
        name,
        description,
        categoryId,
        servingAmount,
        servingType,
        difficulty,
        preparationTime,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[BASICS RECIPE POST]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
