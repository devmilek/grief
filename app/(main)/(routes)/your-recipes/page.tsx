import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import CreateRecipeCard from "./_components/create-recipe-card";
import RecipeCard from "./_components/recipe-card";

const YourRecipesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

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

  const recipes = await db.recipe.findMany({
    where: {
      profileId: session.user.id,
    },
  });

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
      </div>
      <h1 className="font-display text-3xl mt-16 mb-6">Zarządzaj przepisami</h1>
      <div className="flex flex-col space-y-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default YourRecipesPage;
