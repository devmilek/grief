import { db } from "@/lib/db";
import React from "react";
import IngredientsFeed from "./_components/ingredients-feed";
import StepsFeed from "./_components/steps-feed";
import AuthorCard from "./_components/author-card";
import RecipeHero from "./_components/recipe-hero";

const page = async ({ params }: { params: { recipeId: string } }) => {
  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      published: true,
    },
    include: {
      user: true,
      category: true,
      ingredients: true,
      steps: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!recipe || !recipe.image) {
    return null;
  }
  return (
    <section className="container pt-8">
      <RecipeHero recipe={recipe} />
      <div className="flex space-x-8 mt-10">
        <div className="space-y-10 flex-1">
          <StepsFeed steps={recipe.steps} />
          <AuthorCard user={recipe.user} />
        </div>
        <div className="w-[400px]">
          <IngredientsFeed ingredients={recipe.ingredients} />
        </div>
      </div>
    </section>
  );
};

export default page;
