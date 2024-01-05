import React from "react";
import { db } from "@/lib/db";
import { PAGINATION_ITEMS_PER_PAGE } from "@/constants";
import { HorizontalCard } from "../../../(home-page)/_components/horizontal-card";

interface RecipesFeedProps {
  categoryId: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
}

const RecipesFeed = async ({
  categoryId,
  sortOrder,
  currentPage,
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
    take: PAGINATION_ITEMS_PER_PAGE,
    skip: (currentPage - 1) * PAGINATION_ITEMS_PER_PAGE,
  });
  return (
    <div className="space-y-6 mb-6">
      {recipes.map((recipe) => (
        <HorizontalCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesFeed;
