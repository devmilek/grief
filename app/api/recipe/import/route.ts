import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!body) {
      return new NextResponse("Missing name", { status: 400 });
    }

    console.log("[RECIPE POST]", body);

    const recipe = await db.recipe.create({
      data: {
        name: body.name,
        description: body.description,
        preparationTime: body.preparationTime,
        servingAmount: body.servingAmount,
        profileId: session.user.id,
      },
    });

    for (const step of body.steps) {
      const dbStep = await db.preparationStep.create({
        data: {
          ...step,
          recipeId: recipe.id,
        },
      });
    }

    for (const ingredient of body.ingredients) {
      const dbStep = await db.ingredient.create({
        data: {
          ...ingredient,
          recipeId: recipe.id,
        },
      });
    }

    // console.log(steps);

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[RECIPE POST ERROR]", e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
