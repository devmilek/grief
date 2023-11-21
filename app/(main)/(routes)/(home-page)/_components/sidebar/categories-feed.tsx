"use client";

import { Category } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import CategoryCard from "./category-card";
import { Button } from "@/components/ui/button";
import { useUtilityData } from "@/components/providers/utility-data-provider";

const CategoriesFeed = () => {
  const { categories } = useUtilityData();
  const [showAll, setShowAll] = useState(false);
  const displayedCategories = showAll ? categories : categories.slice(0, 6);
  return (
    <div className="p-5 bg-white rounded-xl space-y-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-display">Kategorie</h1>
        <Link href={"/"} className="text-xs text-neutral-500">
          Zobacz wszystkie
        </Link>
      </header>
      <div className="space-y-3">
        {displayedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <Button
          onClick={() => {
            setShowAll((prev) => !prev);
          }}
          className="w-full"
          variant="outline"
        >
          {showAll ? "Pokaż mniej" : "Pokaż wszystkie"}
        </Button>
      </div>
    </div>
  );
};

export default CategoriesFeed;
