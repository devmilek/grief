import { Recipe } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HorizontalCardProps {
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
}

moment.locale("pl");

const HorizontalCard = ({ recipe }: HorizontalCardProps) => {
  // TODO: find reason why image make hydration error
  return (
    <article className="grid grid-cols-3 gap-x-6 items-center">
      <div className="object-cover aspect-[4/3] rounded-lg overflow-hidden">
        {recipe.image && (
          <Image
            src={recipe.image}
            width={300}
            height={300}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="col-span-2">
        <Link className="font-semibold text-xs text-emerald-600" href={"/"}>
          {recipe.category?.name}
        </Link>
        <Link
          href={"/recipe/" + recipe.id}
          className="font-display text-2xl block mt-1"
        >
          <span className="underline-anim hover:bg-[length:100%_2px]">
            {recipe.name}
          </span>
        </Link>
        <p className="text-neutral-500 text-sm line-clamp-2 mt-2">
          {recipe.description}
        </p>
        <div className="text-xs mt-2 opacity-70">
          <Link href={"/"} className="capitalize">
            {recipe.profile?.name}
          </Link>
          {" • "}
          {moment(recipe.createdAt).fromNow()}
        </div>
      </div>
    </article>
  );
};

export default HorizontalCard;
