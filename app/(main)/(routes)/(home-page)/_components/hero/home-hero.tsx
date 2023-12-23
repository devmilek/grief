import { Recipe } from "@prisma/client";
import React from "react";
import BigRecipeCard from "./big-recipe-card";
import SmallRecipeCard from "./small-recipe-card";

interface HomeHeroProps {
  recipes: (Recipe & {
    category: {
      id: string;
      name: string;
    } | null;
    profile: {
      id: string;
      name: string;
    } | null;
  })[];
}

const HomeHero = ({ recipes }: HomeHeroProps) => {
  const mostPopular = recipes[0];
  const others = recipes.slice(1, 5);
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-4 py-8 gap-x-8">
      <div className="space-y-6 hidden lg:inline-block">
        <SmallRecipeCard recipe={others[0]} />
        <SmallRecipeCard recipe={others[1]} />
      </div>
      <BigRecipeCard recipe={mostPopular} />
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 mt-10 lg:mt-0">
        <SmallRecipeCard recipe={others[2]} />
        <SmallRecipeCard recipe={others[3]} />
      </div>
    </section>
  );
};

export default HomeHero;
