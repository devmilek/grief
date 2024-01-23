"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { NextResponse } from "next/server";
import { z } from "zod";

export const createRecipe = async (
  data: z.infer<typeof BasicsInformationSchema>,
) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const validatedData = BasicsInformationSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: "Invalid data",
    };
  }

  const {
    name,
    image,
    description,
    categoryId,
    servings,
    difficulty,
    preparationTime,
  } = validatedData.data;

  const recipe = await db.recipe.create({
    data: {
      name,
      description,
      image,
      categoryId,
      servings,
      difficulty,
      preparationTime,
      userId: session.user.id,
    },
  });

  return { id: recipe.id };
};
