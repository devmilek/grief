import React from "react";
import HorizontalCard from "../../../(home-page)/_components/horizontal-card";
import { db } from "@/lib/db";

interface RecipesFeedProps {
  categoryId: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
  postToShow: number;
}

const RecipesFeed = async ({
  categoryId,
  sortOrder,
  currentPage,
  postToShow,
}: RecipesFeedProps) => {
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
    take: postToShow,
    skip: (currentPage - 1) * postToShow,
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
