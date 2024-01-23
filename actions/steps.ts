"use server";

import { db } from "@/lib/db";
import { PreparationStepSchema } from "@/schemas/recipe";
import { z } from "zod";

export const addStep = async (
  step: z.infer<typeof PreparationStepSchema>,
  position: number,
  recipeId: string,
) => {
  const validatedFields = PreparationStepSchema.safeParse(step);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.message);
  }

  const { description, image } = validatedFields.data;

  const newStep = await db.preparationStep.create({
    data: {
      description,
      image,
      position,
      recipeId,
    },
  });

  return newStep;
};

export const reorderSteps = async (
  list: { id: string; position: number }[],
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  for (let item of list) {
    await db.preparationStep.update({
      where: { id: item.id },
      data: { position: item.position },
    });
  }
};
