"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const saveRecipe = async (recipeId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Aby zapisać przepis musisz się zalogować");
  }

  await db.userSavedRecipe.create({
    data: {
      recipeId,
      userId: session.user?.id,
    },
  });
};

export const unsaveRecipe = async (recipeId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Aby usunąć przepis z zapisanych musisz się zalogować");
  }

  await db.userSavedRecipe.deleteMany({
    where: {
      recipeId,
      userId: session.user.id,
    },
  });
};

export const checkIfSaved = async (recipeId: string) => {
  const session = await auth();

  if (!session) {
    return false;
  }

  const savedRecipe = await db.userSavedRecipe.findFirst({
    where: {
      recipeId,
      userId: session.user.id,
    },
  });

  return Boolean(savedRecipe);
};
