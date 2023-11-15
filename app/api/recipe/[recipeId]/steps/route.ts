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

    const { image, content } = await req.json();

    if (!content) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const recipeOwner = await db.recipe.findUnique({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
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

    // const step = await db.recipe.update({
    //   where: {
    //     id: params.recipeId,
    //     profileId: session.user.id,
    //   },
    //   data: {
    //     steps: {
    //       create: {
    //         image,
    //         description: content,
    //       },
    //     },
    //   },
    // });

    return NextResponse.json(step);
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
