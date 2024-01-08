import { db } from "@/lib/db";

export const getUnpublishedRecipesCount = async (userId: string) => {
  const recipes = await db.recipe.count({
    where: {
      userId: userId,
      published: false,
    },
  });

  return recipes;
};

export const getRecipesCount = async (userId: string) => {
  const recipesCount = await db.recipe.count({
    where: {
      userId: userId,
    },
  });

  return recipesCount;
};
