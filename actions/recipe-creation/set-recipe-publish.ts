"use server";

import { db } from "@/lib/db";

export const setRecipePublish = async (
  recipeId: string,
  published: boolean,
) => {
  await db.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      published,
    },
  });
};
