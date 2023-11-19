import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import CategoryCard from "./category-card";

interface CategoriesFeedProps {
  categories: (Category & {
    _count: {
      recipes: number;
    };
  })[];
}

const CategoriesFeed = ({ categories }: CategoriesFeedProps) => {
  console.log(categories);
  return (
    <div className="p-5 bg-white rounded-xl space-y-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-display">Kategorie</h1>
        <Link href={"/"} className="text-xs text-neutral-500">
          Zobacz wszystkie
        </Link>
      </header>
      <div className="space-y-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesFeed;
