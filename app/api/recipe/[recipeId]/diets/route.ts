import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
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

    const diets = await db.diet.findMany({
      where: {
        recipes: {
          some: {
            recipeId: recipe.id,
          },
        },
      },
    });

    return NextResponse.json(diets);
  } catch (e) {
    console.log("[OCCASIONS GET]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse("Missing fields", { status: 400 });
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

    const diet = await db.diet.findUnique({
      where: {
        id: id,
      },
    });

    if (!diet) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await db.dietsOnRecipes.create({
      data: {
        dietId: diet.id,
        recipeId: recipe.id,
      },
    });

    return NextResponse.json(diet);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
