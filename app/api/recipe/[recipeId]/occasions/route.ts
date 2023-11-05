import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { value } = await req.json();

    if (!value) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const occasion = await db.recipe.update({
      where: {
        id: params.recipeId,
        profileId: profile.id,
      },
      data: {
        occasions: {
          create: [
            {
              occassion: {
                connect: {
                  id: value,
                },
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(occasion);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
