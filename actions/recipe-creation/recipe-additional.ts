"use server";

import { db } from "@/lib/db";
import { delay } from "@/lib/utils";

// OCCASIONS

export const getRecipeOccasions = async (recipeId: string) => {
  const occasions = await db.occasion.findMany({
    where: {
      recipes: {
        some: {
          recipeId: recipeId,
        },
      },
    },
  });

  return occasions;
};

export const addRecipeOccasion = async (
  occasionId: string,
  recipeId: string,
) => {
  await db.occasionsOnRecipes.create({
    data: {
      occasionId: occasionId,
      recipeId,
    },
  });
};

export const removeRecipeOccasion = async (
  occasionId: string,
  recipeId: string,
) => {
  await db.occasionsOnRecipes.delete({
    where: {
      recipeId_occasionId: {
        occasionId: occasionId,
        recipeId,
      },
    },
  });
};

// CUISINES

export const getRecipeCuisines = async (recipeId: string) => {
  const cuisines = await db.cuisine.findMany({
    where: {
      recipes: {
        some: {
          recipeId: recipeId,
        },
      },
    },
  });

  return cuisines;
};

export const addRecipeCuisine = async (cuisineId: string, recipeId: string) => {
  await db.cuisinesOnRecipes.create({
    data: {
      cuisineId,
      recipeId,
    },
  });
};

export const removeRecipeCuisine = async (
  cuisineId: string,
  recipeId: string,
) => {
  await db.cuisinesOnRecipes.delete({
    where: {
      recipeId_cuisineId: {
        cuisineId,
        recipeId,
      },
    },
  });
};

// DIETS

export const getRecipeDiets = async (recipeId: string) => {
  const diets = await db.diet.findMany({
    where: {
      recipes: {
        some: {
          recipeId: recipeId,
        },
      },
    },
  });

  return diets;
};

export const addRecipeDiet = async (dietId: string, recipeId: string) => {
  await db.dietsOnRecipes.create({
    data: {
      dietId,
      recipeId,
    },
  });
};

export const removeRecipeDiet = async (dietId: string, recipeId: string) => {
  await db.dietsOnRecipes.delete({
    where: {
      recipeId_dietId: {
        dietId,
        recipeId,
      },
    },
  });
};
