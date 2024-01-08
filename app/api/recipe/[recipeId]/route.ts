import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { recipeId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.recipeId) {
      return new NextResponse("Missing recipeId", { status: 400 });
    }

    const recipe = await db.recipe.delete({
      where: {
        id: params.recipeId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[BASICS RECIPE POST]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
