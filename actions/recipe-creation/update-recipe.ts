"use server";

import { db } from "@/lib/db";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { z } from "zod";

export const updateRecipe = async (
  recipeId: string,
  values: z.infer<typeof BasicsInformationSchema>,
) => {
  console.log("updateRecipe", recipeId, values);
  const validatedValues = BasicsInformationSchema.safeParse(values);

  if (!validatedValues.success) {
    console.log(validatedValues.error);
    throw new Error("Invalid values");
  }

  const updatedRecipe = await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      ...validatedValues.data,
    },
  });

  return updatedRecipe;
};
