"use server";

import {
  aiProfile,
  categories,
  cuisines,
  diets,
  occasions,
  recipes,
} from "@/data/placeholder-data";
import { db } from "@/lib/db";

export const seedUtilityData = async () => {
  await db.category.createMany({
    data: categories,
  });

  await db.occasion.createMany({
    data: occasions,
  });

  await db.cuisine.createMany({
    data: cuisines,
  });

  await db.diet.createMany({
    data: diets,
  });
};

export const seedAiUser = async () => {
  await db.user.create({
    data: aiProfile,
  });
};

export const seedRecipes = async () => {
  for (const recipe of recipes) {
    if (recipe.cuisines) {
      await db.cuisinesOnRecipes.createMany({
        data: recipe.cuisines,
      });
    }
    if (recipe.ingredients) {
      await db.ingredient.createMany({
        data: recipe.ingredients,
      });
    }
    if (recipe.steps) {
      await db.preparationStep.createMany({
        data: recipe.steps,
      });
    }
    if (recipe.diets) {
      await db.dietsOnRecipes.createMany({
        data: recipe.diets,
      });
    }
    if (recipe.occasions) {
      await db.occasionsOnRecipes.createMany({
        data: recipe.occasions,
      });
    }
    await db.recipe.create({
      data: {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        image: recipe.image,
        difficulty: recipe.difficulty,
        preparationTime: recipe.preparationTime,
        servings: recipe.servings,
        categoryId: recipe.categoryId,
        userId: recipe.userId,
        published: recipe.published,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });
  }
};

export const seedDb = async () => {
  await seedUtilityData();
  await seedAiUser();
  await seedRecipes();
};
