import { Badge } from "@/components/ui/badge";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import "moment/min/locales";
import { cn } from "@/lib/utils";

interface SmallRecipeCardProps {
  recipe: Recipe & {
    category: {
      id: string;
      name: string;
    } | null;
    profile: {
      id: string;
      name: string;
    } | null;
  };
  className?: string;
}

moment.locale("pl");

const SmallRecipeCard = ({ recipe, className }: SmallRecipeCardProps) => {
  return (
    <article
      className={cn(
        "group w-full flex flex-col items-center text-center",
        className,
      )}
    >
      {recipe.image && (
        <div className="rounded-xl aspect-[4/3] w-full overflow-hidden">
          <Image
            src={recipe.image}
            width={500}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            alt="recipe image"
          />
        </div>
      )}
      <Link
        href="/"
        className="mt-4 cursor-pointer uppercase text-emerald-600 font-semibold text-xs"
      >
        {recipe.category?.name}
      </Link>
      <Link href="/" className="text-xl font-display mt-1">
        <span className="underline-anim group-hover:bg-[length:100%_2px]">
          {recipe.name}
        </span>
      </Link>
      <div className="text-xs text-neutral-500 mt-1">
        <Link href={"/"} className="capitalize">
          {recipe.profile?.name}
        </Link>
        {" • "}
        {moment(recipe.createdAt).fromNow()}
      </div>
    </article>
  );
};

export default SmallRecipeCard;
