import { db } from "@/lib/db";

export const getUtilityData = async () => {
  const [categories, occasions, cuisines, diets] = await db.$transaction([
    db.category.findMany({
      orderBy: {
        recipes: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            recipes: true,
          },
        },
      },
    }),
    db.occasion.findMany(),
    db.cuisine.findMany(),
    db.diet.findMany(),
  ]);
  return { categories, occasions, cuisines, diets };
};

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