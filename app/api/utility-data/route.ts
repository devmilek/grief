import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const [categories, occasions, cuisines, diets] = await db.$transaction([
      db.category.findMany(),
      db.occasion.findMany(),
      db.cuisine.findMany(),
      db.diet.findMany(),
    ]);

    console.log("Fetched utility data from api route");

    return NextResponse.json({
      categories,
      occasions,
      cuisines,
      diets,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
