import React from "react";
import { Recipe } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PAGINATION_ITEMS_PER_PAGE } from "@/constants";
import { RecipeCard, RecipeCardSkeleton } from "./recipe-card";
import Pagination from "@/components/pagination";

interface RecipesFeedProps {
  currentPage: number;
  sortOrder: "asc" | "desc";
}

const RecipesFeed = async ({ currentPage, sortOrder }: RecipesFeedProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const skip = (currentPage - 1) * PAGINATION_ITEMS_PER_PAGE;

  const recipes = await db.recipe.findMany({
    where: {
      profileId: session.user.id,
    },
    orderBy: {
      createdAt: sortOrder,
    },
    take: PAGINATION_ITEMS_PER_PAGE,
    skip: skip,
  });

  const totalRecipes = await db.recipe.count({
    where: {
      profileId: session.user.id,
    },
  });

  const totalPages = Math.ceil(totalRecipes / PAGINATION_ITEMS_PER_PAGE);

  return (
    <>
      <div className="flex flex-col space-y-3 mb-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
};

const RecipesFeedSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(PAGINATION_ITEMS_PER_PAGE)].map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { RecipesFeed, RecipesFeedSkeleton };
