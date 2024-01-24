"use client";

import React from "react";
import { useRecipeAdditional } from "@/hooks/use-recipe-additional";
import { AdditionalSelect } from "./additional-select";

interface AdditionalInfoFormProps {
  recipeId: string;
}

const AdditionalInfo = ({ recipeId }: AdditionalInfoFormProps) => {
  const {
    selectedCuisines,
    addCuisineMutation,
    removeCuisineMutation,
    unselectedCuisines,

    selectedOccasions,
    addOccasionMutation,
    removeOccasionMutation,
    unselectedOccasions,

    selectedDiets,
    addDietMutation,
    removeDietMutation,
    unselectedDiets,
  } = useRecipeAdditional(recipeId);
  return (
    <div>
      <div className="p-8 rounded-xl bg-white space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Okazje</h2>
          <AdditionalSelect
            selectedItems={selectedOccasions}
            unselectedItems={unselectedOccasions}
            addFn={addOccasionMutation}
            removeFn={removeOccasionMutation}
            placeholder="Wybierz okazje"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Kuchnie świata</h2>
          <AdditionalSelect
            selectedItems={selectedCuisines}
            unselectedItems={unselectedCuisines}
            addFn={addCuisineMutation}
            removeFn={removeCuisineMutation}
            placeholder="Wybierz kuchnie"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Diety</h2>
          <AdditionalSelect
            selectedItems={selectedDiets}
            unselectedItems={unselectedDiets}
            addFn={addDietMutation}
            removeFn={removeDietMutation}
            placeholder="Wybierz diety"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
