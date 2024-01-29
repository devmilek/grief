import FacetedSearch from "@/components/facated-search/faceted-search";
import SortButton from "@/components/sort-button";
import React from "react";
import { db } from "@/lib/db";
import EmptyState from "@/components/empty-state";
import RecipesHero from "@/components/recipes-hero";
import {
  HorizontalCard,
  HorizontalCardType,
} from "@/components/cards/horizontal-card";
import FacetedSearchSeet from "@/components/facated-search/faceted-search-sheet";

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
      occasion: {
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
    <div className="container pt-6 space-y-6">
      {searchQuery && (
        <RecipesHero headline="Wyniki wyszukiwania dla" heading={searchQuery} />
      )}
      <div className="flex gap-x-4">
        <section className="bg-white p-6 lg:p-8 rounded-xl flex-1 h-fit">
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
        <aside className="w-full lg:w-[300px] hidden lg:flex rounded-xl p-6 bg-white h-fit">
          <FacetedSearch
            categoriesProp={categories}
            cuisinesProp={cuisines}
            dietsProp={diets}
            occasionsProp={occasions}
          />
        </aside>
      </div>
    </div>
  );
};

const RecipesHeader = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="font-display text-3xl lg:text-4xl">Przepisy</h1>
      <div className="flex space-x-2">
        <SortButton />
        <FacetedSearchSeet className="lg:hidden" />
      </div>
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
