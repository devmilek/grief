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

async function main() {
  // DELETE ALL AI RECIPES AND ALL UTILITY TABLES
  await prisma.profile.delete({
    where: {
      id: aiProfile.id,
    },
  });
  await prisma.recipe.deleteMany({
    where: {
      profileId: aiProfile.id,
    },
  });
  await prisma.category.deleteMany();
  await prisma.cuisine.deleteMany();
  await prisma.diet.deleteMany();
  await prisma.occasion.deleteMany();
  // CREATE USERS
  const user = await prisma.profile.create({
    data: aiProfile,
  });

  // CREATE CATEGORIES
  const cat = await prisma.category.createMany({
    data: categories,
  });

  // CREATE CUISINES
  const cui = await prisma.cuisine.createMany({
    data: cuisines,
  });

  //   CREATE OCCASIONS
  const occ = await prisma.occasion.createMany({
    data: occasions,
  });

  //   CREATE DIETS
  const die = await prisma.diet.createMany({
    data: diets,
  });

  // const rec = await prisma.recipe.createMany({
  //   data: recipes,
  // });
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
        servingType: recipe.servingType,
        servingAmount: recipe.servingAmount,
        categoryId: recipe.categoryId,
        profileId: recipe.profileId,
        published: recipe.published,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
