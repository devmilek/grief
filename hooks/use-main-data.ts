import { Category, Cuisine, Diet, Occasion } from "@prisma/client";
import { create } from "zustand";

interface CreateRecipeModalStore {
  categories: Category[];
  occassions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
  setData: (data: {
    categories: Category[];
    occassions: Occasion[];
    cuisines: Cuisine[];
    diets: Diet[];
  }) => void;
}

export const useCreateRecipeModal = create<CreateRecipeModalStore>((set) => ({
  categories: [],
  occassions: [],
  cuisines: [],
  diets: [],
  setData: (data) => set(data),
}));
