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

    const { value } = await req.json();

    if (!value) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const cuisine = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: session.user.id,
      },
      data: {
        cuisines: {
          create: [
            {
              cuisines: {
                connect: {
                  id: value,
                },
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(cuisine);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
