import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import CreateRecipeTabs from "./_components/create-recipe-tabs";
import BasicsForm from "./_components/basics-form";
import IngredientForm from "./_components/ingredient-form";
import StepsForm from "./_components/steps-form";

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

  if (!recipe) {
    return <div>404</div>;
  }

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
      </CreateRecipeTabs>
    </>
  );
};

export default CreateRecipePage;
