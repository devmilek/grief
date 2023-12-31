"use client";

import { useCreateRecipeModal } from "@/hooks/use-create-recipe";
import { PlusIcon } from "lucide-react";
import React from "react";

const CreateRecipeCard = () => {
  const { onOpen } = useCreateRecipeModal();
  return (
    <div
      onClick={onOpen}
      className="p-6 rounded-xl bg-white border flex items-center col-span-2 cursor-pointer"
    >
      <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-700 mr-3">
        <PlusIcon className="w-4 h-4" />
      </div>
      <div>
        <h2 className="font-display text-lg">Stwórz nowy przepis</h2>
        <p className="text-sm text-neutral-500">
          Podziel się z innymi twoim talentem.
        </p>
      </div>
    </div>
  );
};

export default CreateRecipeCard;
