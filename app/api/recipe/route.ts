import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        published: true,
      },
      include: {
        cuisines: true,
        category: true,
        ingredients: true,
        steps: true,
      },
    });

    return NextResponse.json(recipes);
  } catch (e) {
    console.log("[RECIPE POST]", e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const recipe = await db.recipe.create({
      data: {
        name,
        profileId: session.user.id,
      },
    });

    return NextResponse.json(recipe);
  } catch (e) {
    console.log("[RECIPE POST]", e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
