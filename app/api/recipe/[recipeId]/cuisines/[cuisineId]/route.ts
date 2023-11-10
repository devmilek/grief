import { authOptions } from "@/lib/auth-options";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { profile } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; cuisineId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cuisine = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
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
