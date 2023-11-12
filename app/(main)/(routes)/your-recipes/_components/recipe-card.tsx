import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image as PrismaImage, Recipe } from "@prisma/client";
import { EyeIcon, PenBox, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RecipeCardProps {
  recipe: Recipe & { images: PrismaImage[] };
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-white border flex items-center">
      {recipe.images.length > 0 ? (
        <div>
          <Image
            alt="Recipe image"
            width={200}
            height={200}
            src={recipe.images[0].url}
          />
        </div>
      ) : (
        <div className="aspect-square w-20 rounded-xl bg-gray-50 border"></div>
      )}
      <div className="w-full ml-4">
        <h1 className="font-display text-xl">{recipe.name}</h1>
        <p className="text-sm text-neutral-500 mt-1 truncate max-w-sm">
          {recipe.description}
        </p>
      </div>
      <div className="flex space-x-2 items-center">
        <Badge className="whitespace-nowrap" variant="secondary">
          {recipe.published ? "Opublikowany" : "Wersja robocza"}
        </Badge>
        {recipe.published && (
          <Button variant="ghost" size="icon" asChild>
            <Link href={"/recipe/" + recipe.id}>
              <EyeIcon className="w-4 h-4" />
            </Link>
          </Button>
        )}
        <Button size="icon">
          <Link href={"/create-recipe/" + recipe.id}>
            <PenBox className="w-4 h-4" />
          </Link>
        </Button>
        <Button size="icon" variant="destructive">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
