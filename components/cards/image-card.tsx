import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { cn } from "@/lib/utils";

interface ImageCardProps {
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

const ImageCard = ({ recipe, className }: ImageCardProps) => {
  return (
    <div
      className={cn(
        "group bg-gradient-to-t text-white from-black/60 to-black/0 relative w-full h-96 rounded-xl overflow-hidden flex flex-col justify-end p-8",
        className,
      )}
    >
      <div>
        <Link
          href={"/categories/" + recipe.categoryId}
          className="mt-4 cursor-pointer uppercase font-medium text-xs"
        >
          {recipe.category?.name}
        </Link>
        <Link
          href={"/recipe/" + recipe.id}
          className="text-3xl font-display mt-1 block"
        >
          <span className="underline-anim group-hover:bg-[length:100%_2px]">
            {recipe.name}
          </span>
        </Link>
        <div className="text-xs mt-2 opacity-70">
          <Link href={"/"} className="capitalize">
            {recipe.profile?.name}
          </Link>
          {" • "}
          {moment(recipe.createdAt).fromNow()}
        </div>
      </div>
      {recipe.image && (
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={300}
          height={200}
          className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition"
        />
      )}
    </div>
  );
};

export default ImageCard;
