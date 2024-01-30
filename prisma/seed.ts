import {
  aiProfile,
  categories,
  cuisines,
  diets,
  occasions,
  recipes,
} from "../data/placeholder-data";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedUtilityData = async () => {
  await prisma.category.createMany({
    data: categories,
  });

  await prisma.occasion.createMany({
    data: occasions,
  });

  await prisma.cuisine.createMany({
    data: cuisines,
  });

  await prisma.diet.createMany({
    data: diets,
  });
};

const seedAiUser = async () => {
  await prisma.user.create({
    data: aiProfile,
  });
};

const seedRecipes = async () => {
  for (const recipe of recipes) {
    if (recipe.cuisines) {
      await prisma.cuisinesOnRecipes.createMany({
        data: recipe.cuisines,
      });
    }
    if (recipe.ingredients) {
      await prisma.ingredient.createMany({
        data: recipe.ingredients,
      });
    }
    if (recipe.steps) {
      await prisma.preparationStep.createMany({
        data: recipe.steps,
      });
    }
    if (recipe.diets) {
      await prisma.dietsOnRecipes.createMany({
        data: recipe.diets,
      });
    }
    if (recipe.occasions) {
      await prisma.occasionsOnRecipes.createMany({
        data: recipe.occasions,
      });
    }
    await prisma.recipe.create({
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

seedUtilityData()
  .then(seedAiUser)
  .then(seedRecipes)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
