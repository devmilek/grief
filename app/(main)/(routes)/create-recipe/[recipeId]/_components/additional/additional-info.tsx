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
import { useUtilityData } from "@/components/providers/utility-data-provider";

interface AdditionalInfoFormProps {
  recipeId: string;
}

const AdditionalInfo = ({ recipeId }: AdditionalInfoFormProps) => {
  return (
    <div>
      <div className="p-8 rounded-xl bg-white space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Okazje</h2>
          <OccasionsSelect recipeId={recipeId} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Kuchnie świata</h2>
          <CuisinesSelect recipeId={recipeId} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Diety</h2>
          <DietsSelect recipeId={recipeId} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
