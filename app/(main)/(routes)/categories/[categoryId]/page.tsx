import { db } from "@/lib/db";
import React from "react";
import bgImage from "@/assets/auth-bg.jpg";
import { notFound } from "next/navigation";
import Image from "next/image";

const Page = async ({
  params,
}: {
  params: {
    categoryId: string;
  };
}) => {
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

  const recipes = await db.recipe.findMany({
    where: {
      categoryId: category.id,
      published: true,
    },
    take: 6,
  });
  return (
    <div className="container">
      <section className="rounded-xl overflow-hidden relative h-96">
        <div className="h-full w-full absolute inset-0 bg-black/60 text-white">
          <p className="">Przepisy z kategorią</p>
          <h1>{category.name}</h1>
          <p>{category._count.recipes}</p>
        </div>
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition"
        />
      </section>
    </div>
  );
};

export default Page;
