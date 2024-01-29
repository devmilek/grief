import { db } from "@/lib/db";
import React from "react";
import bgImage from "@/assets/auth-bg.jpg";
import { notFound } from "next/navigation";
import Image from "next/image";
import Sidebar from "../../../../../components/navigation/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { DrumstickIcon, Filter, PocketKnife } from "lucide-react";
import RecipesFeed from "./_components/recipes-feed";
import Pagination from "@/components/pagination";
import { PAGINATION_ITEMS_PER_PAGE } from "@/constants";
import SortButton from "@/components/sort-button";
import FacetedSearch from "@/components/faceted-search";
import RecipesHero from "@/components/recipes-hero";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!category) {
    return null;
  }

  return {
    title: category.name,
    description: `Przepisy z kategorii ${category.name}`,
    image: category.image,
    type: "article",
  };
};

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    orderBy?: "asc" | "desc";
    page?: string;
  };
}

const Page = async ({ params, searchParams }: CategoryPageProps) => {
  const orderBy = searchParams?.orderBy || "desc";
  const currentPage = Number(searchParams?.page) || 1;

  const category = await db.category.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      _count: {
        select: { recipes: true },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  const totalPages = Math.ceil(
    category._count.recipes / PAGINATION_ITEMS_PER_PAGE,
  );

  return (
    <div className="container">
      <section className="rounded-xl overflow-hidden relative h-96 my-6">
        <RecipesHero headline="Przepisy z kategorią" heading={category.name} />
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition"
        />
      </section>
      <div className="flex gap-x-4">
        <section className="bg-white p-8 rounded-xl flex-1 h-fit">
          <header className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl">Wyniki</h1>
            <SortButton />
          </header>
          {category._count.recipes > 0 ? (
            <>
              <RecipesFeed
                categoryId={category.id}
                orderBy={orderBy}
                currentPage={currentPage}
              />
              <Pagination totalPages={totalPages} />
            </>
          ) : (
            <div className="flex flex-col items-center mt-10">
              <DrumstickIcon className="text-emerald-600 h-10 w-10" />
              <h1 className="mt-4">
                Nikt jeszcze nie dodał przepisu z kategorią{" "}
                <strong>{category.name}</strong>
              </h1>
              <p className="text-muted-foreground text-sm">
                Może będziesz pierwszy?
              </p>
            </div>
          )}
        </section>
        <Sidebar />
      </div>
    </div>
  );
};

export default Page;
