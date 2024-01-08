import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import BasicsForm from "./_components/basics/basics-form";
import AdditionalInfo from "./_components/additional/additional-info";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Steps from "./_components/steps/steps";
import Ingredients from "./_components/ingredients/ingredients";
import { auth } from "@/lib/auth";

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

  console.log("REVALIDATE ALL THE THINGS");

  const requiredFields = [
    recipe.name,
    recipe.image,
    recipe.description,
    recipe.categoryId,
    recipe.servingAmount,
    recipe.servingType,
    recipe.difficulty,
    recipe.preparationTime,
  ];

  //TODO: make sure that ingredients are added becuase i already delete this functionality

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="container mt-8 max-w-4xl bg-white rounded-xl p-12 mb-16">
      <BasicsForm
        recipe={recipe}
        isComplete={isComplete}
        isPublished={recipe.published}
      />
      <Accordion type="multiple" className="mt-8">
        <AccordionItem value="Składniki">
          <AccordionTrigger className="font-display text-3xl">
            Składniki
          </AccordionTrigger>
          <AccordionContent>
            <Ingredients recipeId={params.recipeId} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="steps">
          <AccordionTrigger className="font-display text-3xl">
            Kroki przygotowania
          </AccordionTrigger>
          <AccordionContent>
            <Steps recipeId={params.recipeId} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="additional">
          <AccordionTrigger className="font-display text-3xl">
            Dodatkowe informacje
          </AccordionTrigger>
          <AccordionContent>
            <AdditionalInfo recipeId={recipe.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreateRecipePage;
