import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; dietId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const diet = await db.recipe.update({
      where: {
        id: params.recipeId,
        userId: session.user.id,
      },
      data: {
        diets: {
          delete: {
            recipeId_dietId: {
              dietId: params.dietId,
              recipeId: params.recipeId,
            },
          },
        },
      },
    });

    return NextResponse.json(diet);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
