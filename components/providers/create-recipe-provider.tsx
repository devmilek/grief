"use client";

import { Category, Occasion, Cuisine, Diet } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

interface CreateRecipeContextProps {
  title: string;
  setTitle: (title: string) => void;
}

interface CreateRecipeProviderProps extends CreateRecipeContextProps {
  children: ReactNode;
}

export const CreateRecipeContext = createContext<CreateRecipeContextProps>({
  title: "",
  setTitle: (value: string) => {},
});

export const CreateRecipeProvider = ({
  children,
}: CreateRecipeProviderProps) => {
  const [title, setTitle] = useState("");

  return (
    <CreateRecipeContext.Provider value={{ title, setTitle }}>
      {children}
    </CreateRecipeContext.Provider>
  );
};

CreateRecipeContext.displayName = "CreateRecipeContext";

export function useCreateRecipe() {
  const context = useContext(CreateRecipeContext);

  if (!context) {
    throw new Error("useUtilityData must be used within a UtilityDataProvider");
  }

  return context;
}
