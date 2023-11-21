"use client";

import { Category, Occasion, Cuisine, Diet } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

interface UtilityDataContextProps {
  categories: (Category & {
    _count: {
      recipes: number;
    };
  })[];
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
}

interface UtilityDataProviderProps extends UtilityDataContextProps {
  children: ReactNode;
}

export const UtilityDataContext = createContext<UtilityDataContextProps>({
  categories: [],
  occasions: [],
  cuisines: [],
  diets: [],
});

export const UtilityDataProvider = ({
  children,
  categories,
  occasions,
  cuisines,
  diets,
}: UtilityDataProviderProps) => {
  return (
    <UtilityDataContext.Provider
      value={{ categories, occasions, cuisines, diets }}
    >
      {children}
    </UtilityDataContext.Provider>
  );
};

UtilityDataContext.displayName = "UtilityDataContext";

export function useUtilityData() {
  const context = useContext(UtilityDataContext);

  if (!context) {
    throw new Error("useUtilityData must be used within a UtilityDataProvider");
  }

  return context;
}
