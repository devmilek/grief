import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; ingredientId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await db.recipe.update({
      where: {
        userId: session.user.id,
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
