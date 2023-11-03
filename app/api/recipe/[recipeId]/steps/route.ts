import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const profile = await currentProfile();
    const { image, content } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log(image, content);

    if (!image || !content) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const step = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: profile.id,
      },
      data: {
        steps: {
          create: {
            image,
            description: content,
            order: 1,
          },
        },
      },
    });

    return NextResponse.json(step);
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
