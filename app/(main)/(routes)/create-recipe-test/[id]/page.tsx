import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CreateRecipeProvider } from "@/components/providers/create-recipe-provider";
import PageClient from "./page-client";

interface CreateRecipePageProps {
  params: {
    id: string;
  };
}

const CreateRecipePage = async ({ params }: CreateRecipePageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const recipe = await db.recipe.findUnique({
    where: {
      id: params.id,
      profileId: session.user.id,
    },
  });

  if (!recipe) {
    return redirect("/");
  }

  return (
    <CreateRecipeProvider initTitle={recipe.name}>
      <PageClient />
    </CreateRecipeProvider>
  );
};

export default CreateRecipePage;
