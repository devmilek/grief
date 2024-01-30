"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { z } from "zod";

export const updateRecipe = async (
  recipeId: string,
  values: z.infer<typeof BasicsInformationSchema>,
) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const validatedValues = BasicsInformationSchema.safeParse(values);

  if (!validatedValues.success) {
    console.log(validatedValues.error);
    throw new Error("Invalid values");
  }

  const updatedRecipe = await db.recipe.update({
    where: {
      id: recipeId,
      userId: session.user.id,
    },
    data: {
      ...validatedValues.data,
    },
  });

  return updatedRecipe;
};
