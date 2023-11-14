"use client";

import { Cuisine, Diet, Occasion, OccasionsOnRecipes } from "@prisma/client";
import React from "react";
import CheckboxContainer from "./checkbox-container";
import { Button } from "@/components/ui/button";
import AdditionalSelect from "./occasions-select";
import OccasionsSelect from "./occasions-select";
import CuisinesSelect from "./cuisines-select";
import DietsSelect from "./diets-select";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AdditionalInfoFormProps {
  recipeId: string;
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
  selectedOccasions: {
    recipeId: string;
    occassionId: string;
    assignedAt: Date;
    occassion: Occasion;
  }[];
  selectedCuisines: {
    recipeId: string;
    cuisineId: string;
    assignedAt: Date;
    cuisines: Cuisine;
  }[];
  selectedDiets: {
    recipeId: string;
    dietId: string;
    assignedAt: Date;
    diet: Diet;
  }[];
}

const AdditionalInfoForm = ({
  recipeId,
  occasions,
  cuisines,
  diets,
  selectedOccasions,
  selectedCuisines,
  selectedDiets,
}: AdditionalInfoFormProps) => {
  return (
    <div>
      <div className="p-8 rounded-xl bg-white space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Okazje</h2>
          <OccasionsSelect
            recipeId={recipeId}
            occasions={occasions}
            selectedOccasions={selectedOccasions}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Kuchnie świata</h2>
          <CuisinesSelect
            recipeId={recipeId}
            cuisines={cuisines}
            selectedCuisines={selectedCuisines}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Diety</h2>
          <DietsSelect
            recipeId={recipeId}
            diets={diets}
            selectedDiets={selectedDiets}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
