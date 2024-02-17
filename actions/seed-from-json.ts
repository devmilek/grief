"use server";

import desery from "@/data/json/desery.json";
import napoje from "@/data/json/napoje.json";
import pieczywo from "@/data/json/pieczywo.json";
import przetwory from "@/data/json/przetwory.json";
import salatki from "@/data/json/salatki.json";
import zupy from "@/data/json/zupy.json";
import daniaGlowne from "@/data/json/dania-glowne.json";

import {
  RecipeWithRelationsWithoutId,
  aiProfile,
  categories,
} from "@/data/placeholder-data";
import { db } from "@/lib/db";
import { v4 } from "uuid";

export const seedFromJson = async (
  json: RecipeWithRelationsWithoutId[],
  catSlug: string,
) => {
  //   const json = desery as RecipeWithRelationsWithoutId[];
  for (const recipe of json) {
    const id = v4();
    await db.recipe.create({
      data: {
        id,
        name: recipe.name,
        description: recipe.description,
        image:
          "https://res.cloudinary.com/dfwwewpla/image/upload/grien/dcfq9izdzobgzcbctvvu",
        userId: aiProfile.id,
        servings: recipe.servings,
        preparationTime: recipe.preparationTime,
        //@ts-ignore
        difficulty: recipe.difficulty,
        published: true,
        categoryId: categories.find((c) => c.slug === catSlug)?.id,
      },
    });

    for (const ingredient of recipe.ingredients) {
      await db.ingredient.create({
        data: {
          recipeId: id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        },
      });
    }

    for (const step of recipe.steps) {
      await db.preparationStep.create({
        data: {
          recipeId: id,
          description: step.description,
          position: step.position,
        },
      });
    }
  }
};

export const seedDb = async () => {
  await seedFromJson(desery, "desery");
  await seedFromJson(napoje, "napoje");
  await seedFromJson(pieczywo, "pieczywo");
  await seedFromJson(przetwory, "przetwory");
  await seedFromJson(salatki, "salatki");
  await seedFromJson(zupy, "zupy");
  await seedFromJson(daniaGlowne, "dania-glowne");
};
