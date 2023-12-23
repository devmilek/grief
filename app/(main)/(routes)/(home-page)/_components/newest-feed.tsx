import { db } from "@/lib/db";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";
import HorizontalCard from "./horizontal-card";
import { ChevronRight } from "lucide-react";

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
        <Link
          href={"/"}
          className="text-sm text-neutral-500 flex items-center space-x-1"
        >
          <span className="hidden sm:inline-block">Zobacz wszystkie</span>
          <ChevronRight className="h-6 w-6 inline-block" />
        </Link>
      </header>
      <div className="space-y-8 mt-8">
        {recipes.map((recipe) => (
          <HorizontalCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default NewestFeed;
