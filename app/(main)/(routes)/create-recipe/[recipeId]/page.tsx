import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CreateRecipeTabs from "./_components/create-recipe-tabs";
import BasicsForm from "./_components/basics-form";
import IngredientForm from "./_components/ingredient-form";
import StepsForm from "./_components/steps-form";
import AdditionalInfoForm from "./_components/additional-info-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

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
    include: {
      images: true,
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
        order: "asc",
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
    recipe.images,
    recipe.description,
    recipe.categoryId,
    recipe.servingAmount,
    recipe.servingType,
    recipe.difficulty,
    recipe.preparationTime,
  ];

  const isComplete =
    requiredFields.every(Boolean) &&
    recipe.images.length > 0 &&
    ingredients.length > 0 &&
    steps.length > 0;

  return (
    <>
      <CreateRecipeTabs>
        <BasicsForm
          recipe={recipe}
          recipeId={recipe.id}
          categories={categories}
        />
        <IngredientForm ingredients={ingredients} recipeId={recipe.id} />
        <StepsForm recipeId={recipe.id} steps={steps} />
        <AdditionalInfoForm
          recipeId={recipe.id}
          occasions={occasions}
          cuisines={cuisines}
          diets={diets}
          isComplete={isComplete}
          selectedOccasions={selectedOccasions}
          selectedCuisines={selectedCuisines}
          selectedDiets={selectedDiets}
          isPublished={recipe.published}
        />
      </CreateRecipeTabs>
    </>
  );
};

export default CreateRecipePage;
