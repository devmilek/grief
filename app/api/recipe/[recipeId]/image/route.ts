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

    const { url, size, name } = await req.json();

    if (!url || !size || !name) {
      return new NextResponse("Missing required files", { status: 400 });
    }

    const image = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
      },
      data: {
        images: {
          create: {
            url,
            size,
            name,
          },
        },
      },
    });

    return NextResponse.json(image);
  } catch (e) {
    console.log("[RECIPE IMAGE POST]", e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
