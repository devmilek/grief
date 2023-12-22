import ImageCard from "@/components/cards/image-card";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface MainDishesFeedProps {
  recipes: (Recipe & {
    category: {
      id: string;
      name: string;
    } | null;
    profile: {
      id: string;
      name: string;
    } | null;
  })[];
}

const MainDishesFeed = ({ recipes }: MainDishesFeedProps) => {
  return (
    <section>
      <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Dania główne</h1>
        <Link href={"/"} className="text-sm text-neutral-500">
          Zobacz wszystkie
        </Link>
      </header>
      <div className="grid grid-cols-2 gap-5 mt-8">
        {recipes.map((recipe, index) => (
          <ImageCard
            recipe={recipe}
            key={recipe.id}
            className={index == 2 ? "col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
};

export default MainDishesFeed;