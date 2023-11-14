import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { recipeId: string; imageId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await db.image.delete({
      where: {
        id: params.imageId,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[INGREDIENT DELETE]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
