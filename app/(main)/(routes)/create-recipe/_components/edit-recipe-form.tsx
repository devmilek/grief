"use client";

import React from "react";
import BasicsForm from "../_components/basics/basics-form";
import AdditionalInfo from "../_components/additional/additional-info";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Steps from "../_components/steps/steps";
import Ingredients from "../_components/ingredients/ingredients";
import { Recipe } from "@prisma/client";
import useSWR from "swr";
import { getRecipe } from "@/data";

interface EditRecipeProps {
  recipeId: string;
  recipe: Recipe;
  isComplete: boolean;
}

const EditRecipeForm = ({ recipeId, recipe, isComplete }: EditRecipeProps) => {
  const { data } = useSWR(recipeId, getRecipe, {
    fallbackData: recipe,
  });

  if (!data) {
    return <div>null</div>;
  }

  return (
    <div className="container mt-8 max-w-4xl bg-white rounded-xl p-8 lg:p-12 mb-16 relative">
      <BasicsForm recipe={data} isComplete={isComplete} />
      <Accordion type="multiple" className="mt-8">
        <AccordionItem value="ingredients">
          <AccordionTrigger className="font-display text-3xl">
            Składniki
          </AccordionTrigger>
          <AccordionContent>
            <Ingredients recipeId={recipeId} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="steps">
          <AccordionTrigger className="font-display text-3xl">
            Kroki przygotowania
          </AccordionTrigger>
          <AccordionContent>
            <Steps recipeId={recipeId} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="additional">
          <AccordionTrigger className="font-display text-3xl">
            Dodatkowe informacje
          </AccordionTrigger>
          <AccordionContent>
            <AdditionalInfo recipeId={recipeId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditRecipeForm;
