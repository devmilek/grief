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

    const cuisines = await db.cuisine.findMany({
      where: {
        recipes: {
          some: {
            recipeId: recipe.id,
          },
        },
      },
    });

    return NextResponse.json(cuisines);
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

    const cuisine = await db.cuisine.findUnique({
      where: {
        id: id,
      },
    });

    if (!cuisine) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await db.cuisinesOnRecipes.create({
      data: {
        cuisineId: cuisine.id,
        recipeId: recipe.id,
      },
    });

    return NextResponse.json(cuisine);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
