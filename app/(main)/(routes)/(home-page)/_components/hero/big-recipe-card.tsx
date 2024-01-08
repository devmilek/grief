import { Badge } from "@/components/ui/badge";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DateTime } from "luxon";
import moment from "moment";
import "moment/min/locales";

interface BigRecipeCardProps {
  recipe: Recipe & {
    category: {
      id: string;
      name: string;
    } | null;
    user: {
      id: string;
      name: string;
    } | null;
  };
}

moment.locale("pl");

const BigRecipeCard = ({ recipe }: BigRecipeCardProps) => {
  const dt = DateTime.fromJSDate(recipe.createdAt);
  return (
    <article className="w-full lg:col-span-2">
      <div className="group flex flex-col items-center">
        {recipe.image && (
          <div className="rounded-xl aspect-video lg:aspect-[4/3] w-full relative overflow-hidden">
            <Image
              src={recipe.image}
              width={500}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-all"
              alt="recipe image"
            />
          </div>
        )}
        <Badge className="mt-4 cursor-pointer">{recipe.category?.name}</Badge>
        <Link
          href={"/recipe/" + recipe.id}
          className="text-3xl font-display mt-2"
        >
          <span className="underline-anim group-hover:bg-[length:100%_2px]">
            {recipe.name}
          </span>
        </Link>
        <div className="text-xs text-neutral-500 mt-2">
          <Link href={"/"} className="capitalize">
            {recipe.user?.name}
          </Link>
          {" • "}
          {moment(recipe.createdAt).fromNow()}
        </div>
      </div>
    </article>
  );
};

export default BigRecipeCard;
