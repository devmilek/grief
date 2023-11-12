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

    const { image, content, order } = await req.json();

    if (!content || !order) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const step = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
      },
      data: {
        steps: {
          create: {
            image,
            description: content,
            order,
          },
        },
      },
    });

    return NextResponse.json(step);
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
