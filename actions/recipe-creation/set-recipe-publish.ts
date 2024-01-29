"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const setRecipePublish = async (recipeId: string, publish: boolean) => {
  const session = await auth();

  if (!session) throw new Error("Musisz być zalogowany");

  const userId = session.user.id;

  if (publish) {
    const [ingredients, steps] = await db.$transaction([
      db.ingredient.findFirst({
        where: {
          recipeId,
        },
      }),
      db.preparationStep.findFirst({
        where: {
          recipeId,
        },
      }),
    ]);

    if (!ingredients)
      throw new Error("Przepis musi mieć przynajmniej jeden składnik");

    if (!steps)
      throw new Error(
        "Przepis musi mieć przynajmniej jeden krok przygotowania",
      );

    await db.recipe.update({
      where: {
        id: recipeId,
        userId,
      },
      data: {
        published: publish,
      },
    });
  } else {
    await db.recipe.update({
      where: {
        id: recipeId,
        userId,
      },
      data: {
        published: false,
      },
    });
  }
};
