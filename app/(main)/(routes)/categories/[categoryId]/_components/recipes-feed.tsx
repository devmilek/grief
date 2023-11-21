import React from "react";
import HorizontalCard from "../../../(home-page)/_components/horizontal-card";
import { db } from "@/lib/db";

interface RecipesFeedProps {
  categoryId: string;
  sortOrder: "asc" | "desc";
}

const RecipesFeed = async ({ categoryId, sortOrder }: RecipesFeedProps) => {
  const recipes = await db.recipe.findMany({
    where: {
      categoryId,
      published: true,
    },
    orderBy: {
      createdAt: sortOrder,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 6,
  });
  return (
    <div className="space-y-6">
      {recipes.map((recipe) => (
        <HorizontalCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesFeed;
