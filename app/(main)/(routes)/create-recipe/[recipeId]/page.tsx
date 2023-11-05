import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import CreateRecipeTabs from "./_components/create-recipe-tabs";
import BasicsForm from "./_components/basics-form";
import IngredientForm from "./_components/ingredient-form";
import StepsForm from "./_components/steps-form";
import AdditionalInfoForm from "./_components/additional-info-form";

interface CreateRecipePageProps {
  params: {
    recipeId: string;
  };
}

const CreateRecipePage = async ({ params }: CreateRecipePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  // const recipe = await db.recipe.findUnique({
  //   where: {
  //     id: params.recipeId,
  //     profileId: profile.id,
  //   },
  //   include: {
  //     ingredients: true,
  //     steps: true,
  //     category: true,
  //     cuisines: true,
  //     diets: true,
  //     occasions: true,
  //     images: true,
  //   },
  // });

  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      profileId: profile.id,
    },
    include: {
      images: true,
    },
  });

  const ingredients = await db.ingredient.findMany({
    where: {
      recipeId: params.recipeId,
    },
    orderBy: {},
  });

  const steps = await db.preparationStep.findMany({
    where: {
      recipeId: params.recipeId,
    },
    orderBy: {
      order: "asc",
    },
  });

  const categories = await db.category.findMany();
  const occasions = await db.occasion.findMany();
  const cuisines = await db.cuisine.findMany();
  const diets = await db.diet.findMany();

  const selectedOccasions = await db.occasionsOnRecipes.findMany({
    where: {
      recipeId: params.recipeId,
    },
    include: {
      occassion: true,
    },
  });

  const selectedCuisines = await db.cuisinesOnRecipes.findMany({
    where: {
      recipeId: params.recipeId,
    },
    include: {
      cuisines: true,
    },
  });

  const selectedDiets = await db.dietsOnRecipes.findMany({
    where: {
      recipeId: params.recipeId,
    },
    include: {
      diet: true,
    },
  });

  if (!recipe) {
    return <div>404</div>;
  }

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

  // return <CreateRecipeForm data={recipe} categories={categories} />;
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
