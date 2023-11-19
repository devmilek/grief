import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { difficultyMap } from "@/maps";
import {
  Category,
  Ingredient,
  PreparationStep,
  Profile,
  Recipe,
} from "@prisma/client";
import { Clock, ChefHatIcon, Star, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RecipeHeroProps {
  recipe: Recipe & {
    profile: Profile;
    category: Category | null;
    steps: PreparationStep[];
    ingredients: Ingredient[];
  };
}

const RecipeHero = ({ recipe }: RecipeHeroProps) => {
  if (!recipe || !recipe.image) {
    return null;
  }
  return (
    <div className="bg-white grid grid-cols-5 p-7 rounded-xl space-x-8">
      <Image
        src={recipe.image}
        alt={recipe?.name}
        width={660}
        height={440}
        className="rounded-lg aspect-[4/3] object-cover flex-shrink-0 col-span-2"
      />
      <div className="flex flex-col col-span-3">
        <h1 className="text-4xl font-display">{recipe.name}</h1>
        <div className="flex items-center space-x-3 mt-4">
          <Link
            href={""}
            className="flex items-center space-x-2 font-semibold text-sm "
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="uppercase text-[10px]">
                {recipe.profile.name?.slice(0, 2)}
              </AvatarFallback>
              {recipe.profile.image && (
                <AvatarImage src={recipe.profile.image} />
              )}
            </Avatar>
            <p className="text-emerald-700">{recipe.profile.name}</p>
          </Link>
          <span className="text-neutral-500">•</span>
          <p className="text-xs text-gray-500">
            {recipe.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="xs" variant="outline">
            {recipe.category?.name}
          </Button>
          <Button size="xs" variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            {recipe.preparationTime}
          </Button>
          <Button size="xs" variant="outline">
            <ChefHatIcon className="h-4 w-4 mr-2" />
            {difficultyMap[recipe.difficulty]}
          </Button>
        </div>
        <p className="mt-6 leading-normal flex-1 text-neutral-500">
          {recipe.description}
        </p>
        <div className="w-full flex items-center justify-between pt-3 border-t">
          <Button variant="ghost">
            <Star className="h-4 w-4 mr-2 text-amber-600" />
            1231
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
