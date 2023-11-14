import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import IngredientsFeed from "./_components/ingredients-feed";
import { Button } from "@/components/ui/button";
import { ChefHatIcon, Clock, Share, Star } from "lucide-react";
import { difficultyMap } from "@/maps";
import StepsFeed from "./_components/steps-feed";
import AuthorCard from "./_components/author-card";

const page = async ({ params }: { params: { recipeId: string } }) => {
  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      published: true,
    },
    include: {
      profile: true,
      category: true,
      ingredients: true,
      steps: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (!recipe || !recipe.image) {
    return null;
  }
  return (
    <section className="container pt-8">
      <div className="bg-white flex p-7 rounded-xl space-x-8">
        <Image
          src={recipe.image}
          alt={recipe?.name}
          width={660}
          height={440}
          className="rounded-lg w-[600px] flex-shrink-0"
        />
        <div className="flex flex-col">
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
          <p className="text-sm mt-6 leading-normal flex-1">
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
      {/* Layout */}
      <div className="flex space-x-8 mt-10">
        <div className="space-y-10 flex-1">
          <StepsFeed steps={recipe.steps} />
          <AuthorCard profile={recipe.profile} />
        </div>
        <div className="w-[400px]">
          <IngredientsFeed ingredients={recipe.ingredients} />
        </div>
      </div>
    </section>
  );
};

export default page;
