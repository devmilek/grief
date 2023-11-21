"use client";

import { Ingredient } from "@prisma/client";
import React, { useEffect, useState } from "react";
import IngredientForm from "./ingredient-form";
import IngredientsFeed from "./ingredients-feed";
import { db } from "@/lib/db";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

interface IngredientsProps {
  recipeId: string;
}

const Ingredients = ({ recipeId }: IngredientsProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const { isLoading, error, data } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/api/recipe/${recipeId}/ingredient`);
      setIngredients(res.data);
      return res.data;
    },
  });

  const deleteIngredient = (ingredientId: string) => {
    setIngredients(ingredients.filter((i) => i.id !== ingredientId));
  };

  const pushIngredient = (ingredient: Ingredient) => {
    setIngredients([ingredient, ...ingredients]);
  };

  return (
    <div className="p-8">
      <IngredientForm pushIngredient={pushIngredient} />
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <IngredientsFeed
          deleteIngredient={deleteIngredient}
          ingredients={ingredients}
        />
      )}
    </div>
  );
};

export default Ingredients;
