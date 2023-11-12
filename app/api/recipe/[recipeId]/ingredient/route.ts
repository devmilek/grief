import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { quantity, unit, name } = await req.json();

    if (!name) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const ingredient = await db.recipe.update({
      where: {
        profileId: session.user.id,
        id: params.recipeId,
      },
      data: {
        ingredients: {
          create: {
            quantity: quantity ? quantity : 0,
            unit,
            name,
          },
        },
      },
    });

    return NextResponse.json(ingredient);
  } catch (e) {
    console.log("[INGREDIENT POST]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
