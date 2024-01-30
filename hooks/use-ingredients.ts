import { getIngredients } from "@/data";
import { IngredientSchema } from "@/schemas/recipe";
import { Ingredient } from "@prisma/client";
import useSWR from "swr";
import { z } from "zod";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import {
  addIngredient,
  deleteIngredient,
} from "@/actions/recipe-creation/ingredients";

export const useIngredients = (recipeId: string) => {
  const key = `ingredients-${recipeId}`;
  const { data: ingredients, isLoading } = useSWR(
    key,
    () => getIngredients(recipeId),
    {
      revalidateOnFocus: false,
    },
  );
  const { mutate } = useSWRConfig();

  const mutateAddIngredient = async (
    ingredient: z.infer<typeof IngredientSchema>,
  ) => {
    const optimisticIngredient = {
      ...ingredient,
      quantity: ingredient.quantity || null,
      id: Date.now().toString(), // Generate a temporary unique ID
      recipeId,
    };

    toast.promise(
      mutate(
        key,
        async () => {
          const newIngredient = await addIngredient(ingredient, recipeId);
          return [newIngredient, ...(ingredients || [])].sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        },
        {
          optimisticData: [optimisticIngredient, ...(ingredients || [])].sort(
            (a, b) => a.name.localeCompare(b.name),
          ),
        },
      ),
      {
        loading: "Dodawanie składnika...",
        success: "Składnik dodany!",
        error: "Nie udało się dodać składnika",
      },
    );
  };

  const mutateDeleteIngredient = async (ingredientId: string) => {
    const optimisticIngredients = (ingredients || []).filter(
      (ingredient) => ingredient.id !== ingredientId,
    );

    toast.promise(
      mutate(
        key,
        async () => {
          await deleteIngredient(ingredientId);
          return optimisticIngredients;
        },
        {
          optimisticData: optimisticIngredients.sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        },
      ),
      {
        loading: "Usuwanie składnika...",
        success: "Składnik usuniety!",
        error: "Nie udało się usunąć składnika",
      },
    );
  };

  return {
    ingredients,
    mutateAddIngredient,
    mutateDeleteIngredient,
    isLoading,
  };
};
