import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { recipeId: string } },
) {
  try {
    const { list } = await req.json();

    const recipe = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
      },
    });

    if (!recipe) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.preparationStep.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
