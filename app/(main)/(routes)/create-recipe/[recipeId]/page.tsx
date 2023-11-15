import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import BasicsForm from "./_components/basics/basics-form";
import AdditionalInfo from "./_components/additional/additional-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Ingredient from "./_components/ingredients/ingredients";
import Steps from "./_components/steps/steps";

interface CreateRecipePageProps {
  params: {
    recipeId: string;
  };
}

const CreateRecipePage = async ({ params }: CreateRecipePageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      profileId: session.user.id,
    },
  });

  if (!recipe) {
    return redirect("/");
  }

  const [
    ingredients,
    steps,
    categories,
    occasions,
    cuisines,
    diets,
    selectedOccasions,
    selectedCuisines,
    selectedDiets,
  ] = await db.$transaction([
    db.ingredient.findMany({
      where: {
        recipeId: params.recipeId,
      },
      orderBy: {},
    }),
    db.preparationStep.findMany({
      where: {
        recipeId: params.recipeId,
      },
      orderBy: {
        position: "asc",
      },
    }),
    db.category.findMany(),
    db.occasion.findMany(),
    db.cuisine.findMany(),
    db.diet.findMany(),
    db.occasionsOnRecipes.findMany({
      where: {
        recipeId: params.recipeId,
      },
      include: {
        occassion: true,
      },
    }),
    db.cuisinesOnRecipes.findMany({
      where: {
        recipeId: params.recipeId,
      },
      include: {
        cuisines: true,
      },
    }),
    db.dietsOnRecipes.findMany({
      where: {
        recipeId: params.recipeId,
      },
      include: {
        diet: true,
      },
    }),
  ]);

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

  const isComplete =
    requiredFields.every(Boolean) && ingredients.length > 0 && steps.length > 0;

  return (
    <div className="container mt-8 max-w-4xl bg-white rounded-xl p-12 mb-16">
      <BasicsForm
        recipe={recipe}
        recipeId={recipe.id}
        categories={categories}
        isComplete={isComplete}
        isPublished={recipe.published}
      />
      <Accordion type="multiple" className="mt-8">
        <AccordionItem value="Składniki">
          <AccordionTrigger className="font-display text-3xl">
            Składniki
          </AccordionTrigger>
          <AccordionContent>
            <Ingredient ingredients={ingredients} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="steps">
          <AccordionTrigger className="font-display text-3xl">
            Kroki przygotowania
          </AccordionTrigger>
          <AccordionContent>
            <Steps steps={steps} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="additional">
          <AccordionTrigger className="font-display text-3xl">
            Dodatkowe informacje
          </AccordionTrigger>
          <AccordionContent>
            <AdditionalInfo
              recipeId={recipe.id}
              occasions={occasions}
              cuisines={cuisines}
              diets={diets}
              selectedOccasions={selectedOccasions}
              selectedCuisines={selectedCuisines}
              selectedDiets={selectedDiets}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreateRecipePage;
