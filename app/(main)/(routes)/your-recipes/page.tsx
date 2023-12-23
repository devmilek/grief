import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import CreateRecipeCard from "./_components/create-recipe-card";
import { Role } from "@prisma/client";
import ImportRecipesCard from "./_components/import-recipes-card";
import { RecipesFeed, RecipesFeedSkeleton } from "./_components/recipes-feed";
import SortButton from "@/components/sort-button";

interface YourRecipesPageProps {
  searchParams?: {
    sortOrder?: "asc" | "desc";
    page?: string;
  };
}

const YourRecipesPage = async ({ searchParams }: YourRecipesPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const recipesCount = await db.recipe.count({
    where: {
      profileId: session.user.id,
    },
  });

  const unpublishedRecipesCount = await db.recipe.count({
    where: {
      profileId: session.user.id,
      published: false,
    },
  });

  //TODO: Sort by published and unpublished
  //TODO: Create card suspence

  const currentPage = Number(searchParams?.page) || 1;

  const sortOrder = searchParams?.sortOrder || "asc";

  return (
    <section className="container">
      <h1 className="font-display text-3xl mt-6 mb-6">Twoje przepisy</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-white border">
          <p className="text-sm font-medium text-neutral-600">
            Łączna ilość postów
          </p>
          <h1 className="font-display text-3xl mt-1">{recipesCount}</h1>
        </div>

        <div className="p-6 rounded-xl bg-white border">
          <p className="text-sm font-medium text-neutral-600">Wersje robocze</p>
          <h1 className="font-display text-3xl mt-1">
            {unpublishedRecipesCount}
          </h1>
        </div>

        <CreateRecipeCard />
        {profile?.role === Role.admin && <ImportRecipesCard />}
      </div>
      <header className="flex items-center justify-between mt-16 mb-6">
        <h1 className="font-display text-3xl">Zarządzaj przepisami</h1>
        <SortButton />
      </header>
      <Suspense fallback={<RecipesFeedSkeleton />}>
        <RecipesFeed currentPage={currentPage} sortOrder={sortOrder} />
      </Suspense>
    </section>
  );
};

export default YourRecipesPage;
