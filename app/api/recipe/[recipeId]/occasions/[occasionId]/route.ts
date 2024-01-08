import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; occasionId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const occasion = await db.recipe.update({
      where: {
        id: params.recipeId,
        userId: session.user.id,
      },
      data: {
        occasions: {
          delete: {
            recipeId_occassionId: {
              occassionId: params.occasionId,
              recipeId: params.recipeId,
            },
          },
        },
      },
    });

    return NextResponse.json(occasion);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
