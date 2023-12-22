import {
  CreateRecipeProvider,
  useCreateRecipe,
} from "@/components/providers/create-recipe-provider";
import React from "react";
import PageClient from "./page-client";
import { db } from "@/lib/db";

const TestRecipePage = async () => {
  const recipes = await db.recipe.findMany({
    where: { published: true },
    include: {
      ingredients: true,
      steps: true,
    },
  });
  console.log(recipes);
  return (
    <CreateRecipeProvider title="asdndkjfnv">
      <PageClient recipes={recipes} />
    </CreateRecipeProvider>
  );
};

export default TestRecipePage;
