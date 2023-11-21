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

    const occasions = await db.occasion.findMany({
      where: {
        recipes: {
          some: {
            recipeId: recipe.id,
          },
        },
      },
    });

    return NextResponse.json(occasions);
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
    const session = await getServerSession(authOptions);

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
        profileId: session.user.id,
      },
    });

    if (!recipe) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const occasion = await db.occasion.findUnique({
      where: {
        id: id,
      },
    });

    if (!occasion) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const recipeOccasion = await db.occasionsOnRecipes.create({
      data: {
        occassionId: occasion.id,
        recipeId: recipe.id,
      },
    });

    return NextResponse.json(occasion);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
