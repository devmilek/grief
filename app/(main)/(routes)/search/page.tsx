import FacetedSearch from "@/components/faceted-search";
import SortButton from "@/components/sort-button";
import React from "react";
import { db } from "@/lib/db";
import EmptyState from "@/components/empty-state";
import RecipesHero from "@/components/recipes-hero";
import {
  HorizontalCard,
  HorizontalCardType,
} from "@/components/cards/horizontal-card";

interface SearchPageProps {
  searchParams?: {
    orderBy?: "asc" | "desc";
    page?: string;
    categories?: string;
    occasions?: string;
    cuisines?: string;
    diets?: string;
    q: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const searchQuery = searchParams?.q;
  const categories = searchParams?.categories?.split(",");
  const occasions = searchParams?.occasions?.split(",");
  const cuisines = searchParams?.cuisines?.split(",");
  const diets = searchParams?.diets?.split(",");

  const occasionFilter = {
    some: {
      occassion: {
        slug: {
          in: occasions,
        },
      },
    },
  };

  const cuisinesFilter = {
    some: {
      cuisines: {
        slug: {
          in: cuisines,
        },
      },
    },
  };

  const dietsFilter = {
    some: {
      diet: {
        slug: {
          in: diets,
        },
      },
    },
  };

  const searchQueryFilter = {
    name: {
      search: searchQuery,
    },
  };

  const recipes = await db.recipe.findMany({
    where: {
      name: {
        search: searchQuery,
      },
      category: {
        slug: {
          in: categories,
        },
      },
      occasions: occasions ? occasionFilter : undefined,
      cuisines: cuisines ? cuisinesFilter : undefined,
      diets: diets ? dietsFilter : undefined,
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  console.log(recipes);

  return (
    <div className="container pt-6">
      {searchQuery && (
        <RecipesHero headline="Wyniki wyszukiwania dla" heading={searchQuery} />
      )}
      <div className="flex gap-x-4">
        <aside className="w-full lg:w-[400px] space-y-6 lg:space-y-10">
          <FacetedSearch />
        </aside>
        <section className="bg-white p-8 rounded-xl flex-1 h-fit">
          <RecipesHeader />
          {!!recipes.length && <RecipesFeed recipes={recipes} />}
          {!recipes.length && (
            <EmptyState
              heading="Nie znaleziono przepisów"
              description="Spróbuj zmienić kryteria wyszukiwania lub dodaj własny przepis"
              buttonLabel="Dodaj przepis"
            />
          )}
        </section>
      </div>
    </div>
  );
};

const RecipesHeader = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="font-display text-4xl">Przepisy</h1>
      <SortButton />
    </header>
  );
};

const RecipesFeed = ({ recipes }: { recipes: HorizontalCardType[] }) => {
  return (
    <div className="grid gap-6">
      {recipes.map((recipe) => (
        <HorizontalCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default SearchPage;
