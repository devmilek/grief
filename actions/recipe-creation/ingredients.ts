"use server";

import { db } from "@/lib/db";
import { IngredientSchema } from "@/schemas/recipe";
import { z } from "zod";

export const addIngredient = async (
  ingredient: z.infer<typeof IngredientSchema>,
  recipeId: string,
) => {
  console.log(ingredient.quantity);
  const validatedFields = IngredientSchema.safeParse(ingredient);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.message);
  }

  const { name, quantity, unit } = validatedFields.data;

  const newIngredient = await db.ingredient.create({
    data: {
      name,
      quantity: quantity || null,
      unit,
      recipeId,
    },
  });

  return newIngredient;
};

new Promise((resolve) => setTimeout(resolve, 5000));

export const deleteIngredient = async (ingredientId: string) => {
  const ingredient = await db.ingredient.delete({
    where: {
      id: ingredientId,
    },
  });

  return ingredient;
};
