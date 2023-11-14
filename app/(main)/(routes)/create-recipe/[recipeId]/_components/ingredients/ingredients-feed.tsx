import { Ingredient } from "@prisma/client";
import React from "react";
import IngredientCard from "./ingredient-card";

interface IngredientsFeedProps {
  ingredients: Ingredient[];
}

// ingredients.length > 0;

const IngredientsFeed = ({ ingredients }: IngredientsFeedProps) => {
  if (ingredients.length > 0) {
    return (
      <>
        <h1 className="font-display text-2xl mb-4 mt-8">Lista składników</h1>
        <div className="space-y-3">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </>
    );
  }
};

export default IngredientsFeed;
