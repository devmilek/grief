import { Ingredient } from "@prisma/client";
import React from "react";
import IngredientForm from "./ingredient-form";
import IngredientsFeed from "./ingredients-feed";

interface IngredientsProps {
  ingredients: Ingredient[];
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div className="p-8">
      <IngredientForm />
      <IngredientsFeed ingredients={ingredients} />
    </div>
  );
};

export default Ingredients;
