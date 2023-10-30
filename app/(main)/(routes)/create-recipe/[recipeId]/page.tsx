import { db } from "@/lib/db";
import CreateRecipeForm from "./_components/create-recipe-form";
import { currentProfile } from "@/lib/current-profile";

interface CreateRecipePageProps {
  params: {
    recipeId: string;
  };
}

const CreateRecipePage = async ({ params }: CreateRecipePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return <div>404</div>;
  }
  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeId,
      profileId: profile.id,
    },
    include: {
      ingredients: true,
      steps: true,
      category: true,
      cuisines: true,
      diets: true,
      occasions: true,
      images: true,
    },
  });

  const categories = await db.category.findMany();

  if (!recipe) {
    return <div>404</div>;
  }

  return <CreateRecipeForm data={recipe} categories={categories} />;
};

export default CreateRecipePage;
