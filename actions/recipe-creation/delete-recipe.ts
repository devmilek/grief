"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const deleteRecipe = async (id: string) => {
  const session = await auth();

  if (!session) throw new Error("Not authenticated");

  const deletedRecipe = await db.recipe.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!deletedRecipe) throw new Error("Recipe not found");

  return deletedRecipe;
};
