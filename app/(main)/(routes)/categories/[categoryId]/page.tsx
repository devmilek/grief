import { db } from "@/lib/db";
import React from "react";
import bgImage from "@/assets/auth-bg.jpg";
import { notFound } from "next/navigation";
import Image from "next/image";
import HomeSidebar from "../../(home-page)/_components/sidebar/home-sidebar";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import SortButton from "./_components/sort-button";
import HorizontalCard from "../../(home-page)/_components/horizontal-card";
import RecipesFeed from "./_components/recipes-feed";
import Pagination from "@/components/pagination";

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    categoryId: string;
  };
  searchParams?: {
    sortOrder?: "asc" | "desc";
    page?: string;
  };
}) => {
  const query = searchParams?.sortOrder || "asc";
  const currentPage = Number(searchParams?.page) || 1;

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
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

  const postToShow = 6;

  const totalPages = Math.ceil(category._count.recipes / postToShow);

  return (
    <div className="container">
      <section className="rounded-xl overflow-hidden relative h-96 my-10">
        <div className="h-full w-full absolute inset-0 bg-black/60 text-white flex items-center justify-center flex-col">
          <p className="text-lg font-medium">Przepisy z kategorią</p>
          <h1 className="font-display text-5xl">{category.name}</h1>
          <p className="text-medium text-sm opacity-70 mt-2">
            {category._count.recipes} przepisów
          </p>
        </div>
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition"
        />
      </section>
      <div className="flex gap-x-4">
        <section className="bg-white p-8 rounded-xl flex-1">
          <header className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl">Wyniki</h1>
            <SortButton />
          </header>
          <RecipesFeed
            categoryId={category.id}
            sortOrder={query}
            currentPage={currentPage}
            postToShow={postToShow}
          />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </section>
        <HomeSidebar />
      </div>
    </div>
  );
};

export default Page;
