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

    const steps = await db.preparationStep.findMany({
      where: {
        recipeId: recipe.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json(steps);
  } catch (e) {
    console.log("[STEPS GET]", e);
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

    const { image, content } = await req.json();

    if (!content) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const recipeOwner = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
        userId: session.user.id,
      },
    });

    if (!recipeOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastStep = await db.preparationStep.findFirst({
      where: {
        recipeId: params.recipeId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastStep ? lastStep.position + 1 : 1;

    const step = await db.preparationStep.create({
      data: {
        description: content,
        image,
        recipeId: params.recipeId,
        position: newPosition,
      },
    });

    return NextResponse.json(step);
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
