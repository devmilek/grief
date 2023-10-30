"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import queryString from "query-string";
import {
  Category,
  CuisinesOnRecipes,
  DietsOnRecipes,
  Image as PrismaImage,
  Ingredient,
  OccasionsOnRecipes,
  PreparationStep,
  Recipe,
} from "@prisma/client";
import React, { useCallback } from "react";
import BasicsForm from "./basics-form";
import IngredientForm from "./ingredient-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface CreateRecipeFormProps {
  data: Recipe & {
    ingredients: Ingredient[];
    steps: PreparationStep[];
    category: Category | null;
    cuisines: CuisinesOnRecipes[];
    diets: DietsOnRecipes[];
    occasions: OccasionsOnRecipes[];
    images: PrismaImage[];
  };
  categories: Category[];
}

const CreateRecipeForm = ({ data, categories }: CreateRecipeFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const step = searchParams.get("step");
  const [activeStep, setActiveStep] = React.useState(step || "basics");

  const handleTabChange = (value: string) => {
    setActiveStep(value);
    router.push(pathname + "?" + queryString.stringify({ step: value }));
  };

  return (
    <Tabs
      className="container pb-12"
      defaultValue="basics"
      value={activeStep}
      onValueChange={handleTabChange}
    >
      <div className="flex items-center w-full justify-center">
        <TabsList className="space-x-3">
          <TabsTrigger value="basics">Podstawy</TabsTrigger>
          <TabsTrigger value="ingredients">Składniki</TabsTrigger>
          <TabsTrigger value="steps">Kroki przygotowania</TabsTrigger>
          <TabsTrigger value="additional">Dodatkowe informacje</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="basics" className="max-w-4xl mx-auto mt-10">
        <BasicsForm categories={categories} data={data} />
      </TabsContent>
      <TabsContent value="ingredients" className="max-w-4xl mx-auto mt-10">
        <IngredientForm ingredients={data.ingredients} id={data.id} />
      </TabsContent>
    </Tabs>
  );
};

export default CreateRecipeForm;
