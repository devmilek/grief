import { ImageCard, ImageCardSkeleton } from "@/components/cards/image-card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const getMostPopularRecipes = async () => {
  //TODO: get most popular not main dishes
  const recipes = await db.recipe.findMany({
    where: {
      published: true,
      category: {
        slug: "dania-glowne",
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 3,
  });
  return recipes;
};

const MostPopularFeed = async () => {
  const recipes = await getMostPopularRecipes();

  return (
    <section>
      {/* <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Najpopularniejsze</h1>
        <Link
          href={"/categories/" + recipes[0]?.category?.id}
          className="text-sm text-neutral-500 flex items-center space-x-1"
        >
          <span className="hidden sm:inline-block">Zobacz wszystkie</span>
          <ChevronRight className="h-6 w-6 inline-block" />
        </Link>
      </header> */}
      <div className="grid md:grid-cols-2 gap-5">
        {recipes.map((recipe, index) => (
          <ImageCard
            recipe={recipe}
            key={recipe.id}
            className={index == 2 ? "md:col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
};

const MostPopularFeedSkeleton = () => {
  return (
    <section>
      <header>
        <Skeleton className="h-9 w-1/3"></Skeleton>
      </header>
      <div>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <ImageCardSkeleton />
          <ImageCardSkeleton />
          <ImageCardSkeleton className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
};

export { MostPopularFeed, MostPopularFeedSkeleton };
