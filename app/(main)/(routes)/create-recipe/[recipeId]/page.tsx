import { db } from "@/lib/db";
import { redirect } from "next/navigation";
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
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { updateRecipe } from "@/actions/recipe-creation/update-recipe";
import { z } from "zod";
import { BasicsInformationSchema } from "@/schemas/recipe";
import EditRecipeForm from "../_components/edit-recipe-form";

interface CreateRecipePageProps {
  params: {
    recipeId: string;
  };
}

const CreateRecipePage = async ({ params }: CreateRecipePageProps) => {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      userId: session.user.id,
    },
  });

  if (!recipe) {
    return redirect("/");
  }

  const requiredFields = [
    recipe.name,
    recipe.image,
    recipe.description,
    recipe.categoryId,
    recipe.difficulty,
    recipe.preparationTime,
  ];

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <EditRecipeForm
        recipeId={recipe.id}
        recipe={recipe}
        isComplete={isComplete}
      />
    </>
  );
};

export default CreateRecipePage;
