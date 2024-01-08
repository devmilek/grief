import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; stepId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
        userId: session.user.id,
      },
    });

    if (!recipe) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const step = await db.preparationStep.delete({
      where: {
        id: params.stepId,
        recipeId: recipe.id,
      },
    });

    return NextResponse.json(step);
  } catch (e) {
    console.log("[INGREDIENT DELETE]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
