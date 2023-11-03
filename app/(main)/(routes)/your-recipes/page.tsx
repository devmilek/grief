import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const YourRecipesPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
  }

  const recipesCount = await db.recipe.count({
    where: {
      profileId: profile.id,
    },
  });

  const recipes = await db.recipe.findMany({
    where: {
      profileId: profile.id,
    },
    select: {
      name: true,
      id: true,
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
          <h1 className="font-display text-3xl mt-1">{recipesCount}</h1>
        </div>

        <div className="p-6 rounded-xl bg-white border flex items-center col-span-2">
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-700 mr-3">
            <PlusIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display text-lg">Stwórz nowy przepis</h2>
            <p className="text-sm text-neutral-500">
              Podziel się z innymi twoim talentem.
            </p>
          </div>
        </div>
      </div>
      <h1 className="font-display text-3xl mt-6 mb-6">Zarządzaj przepisami</h1>
      <div className="flex flex-col space-y-3">
        {recipes.map((recipe) => (
          <Link href={"/create-recipe/" + recipe.id} key={recipe.id}>
            {recipe.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default YourRecipesPage;
