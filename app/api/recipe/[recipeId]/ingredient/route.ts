import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
      },
    });

    if (!recipe) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ingredients = await db.ingredient.findMany({
      where: {
        recipeId: recipe.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(ingredients);
  } catch (e) {
    console.log("[INGREDIENT GET]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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

    const recipe = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
      },
    });

    if (!recipe) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ingredient = await db.ingredient.create({
      data: {
        name,
        unit,
        quantity: quantity ? quantity : 0,
        recipeId: recipe.id,
      },
    });

    return NextResponse.json(ingredient);
  } catch (e) {
    console.log("[INGREDIENT POST]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
