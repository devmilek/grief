import { db } from "@/lib/db";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";
import HorizontalCard from "./horizontal-card";

const NewestFeed = async () => {
  const recipes = await db.recipe.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 4,
  });
  return (
    <section className="p-9 bg-white rounded-xl my-10">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Najnowsze</h1>
        <Link href={"/"} className="text-sm text-neutral-500">
          Zobacz wszystkie
        </Link>
      </header>
      <div className="space-y-6 mt-8">
        {recipes.map((recipe) => (
          <HorizontalCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default NewestFeed;
