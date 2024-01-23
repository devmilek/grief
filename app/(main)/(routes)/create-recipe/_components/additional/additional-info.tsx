"use client";

import React from "react";
import OccasionsSelect from "./occasions-select";
import CuisinesSelect from "./cuisines-select";
import DietsSelect from "./diets-select";

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
