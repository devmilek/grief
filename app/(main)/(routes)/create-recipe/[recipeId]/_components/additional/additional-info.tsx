"use client";

import {
  Cuisine,
  CuisinesOnRecipes,
  Diet,
  DietsOnRecipes,
  Occasion,
  OccasionsOnRecipes,
} from "@prisma/client";
import React from "react";
import OccasionsSelect from "./occasions-select";
import CuisinesSelect from "./cuisines-select";
import DietsSelect from "./diets-select";

interface AdditionalInfoFormProps {
  recipeId: string;
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];

  selectedOccasions: ({
    occassion: Occasion;
  } & OccasionsOnRecipes)[];

  selectedCuisines: ({
    cuisines: Cuisine;
  } & CuisinesOnRecipes)[];

  selectedDiets: ({
    diet: Diet;
  } & DietsOnRecipes)[];
}

const AdditionalInfo = ({
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

export default AdditionalInfo;
