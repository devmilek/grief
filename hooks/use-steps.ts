import { getIngredients, getSteps } from "@/data";
import { IngredientSchema, PreparationStepSchema } from "@/schemas/recipe";
import { Ingredient } from "@prisma/client";
import useSWR from "swr";
import { z } from "zod";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { DropResult } from "@hello-pangea/dnd";
import { addStep, reorderSteps } from "@/actions/recipe-creation/steps";

export const useSteps = (recipeId: string) => {
  const stepsKey = recipeId + "-steps";
  const { data: steps } = useSWR(stepsKey, () => getSteps(recipeId), {
    revalidateOnFocus: false,
  });
  const { mutate } = useSWRConfig();

  const mutateAddStep = async (step: z.infer<typeof PreparationStepSchema>) => {
    const optimisticStep = {
      ...step,
      id: Date.now().toString(),
      position: (steps?.length || 0) + 1,
      recipeId,
    };

    const mutatePromise = mutate(
      recipeId,
      async () => {
        const newStep = await addStep(step, (steps?.length || 0) + 1, recipeId);
        return [newStep, ...(steps || [])].sort(
          (a, b) => a.position - b.position,
        );
      },
      {
        // optimisticData: [optimisticStep, ...(steps || [])].sort((a, b) =>
        //   a.description.localeCompare(b.description),
        // ),
        revalidate: true,
      },
    );

    toast.promise(mutatePromise, {
      loading: "Dodawanie kroku przygotowania...",
      success: "Krok przygotowania dodany!",
      error: "Nie udało się dodać kroku przygotowania",
    });
  };

  const mutateStepReorder = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(steps || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSteps = items.slice(startIndex, endIndex + 1);

    const bulkUpdateData = updatedSteps.map((step) => ({
      id: step.id,
      position: items.findIndex((item) => item.id === step.id),
    }));

    const mutatePromise = mutate(
      recipeId,
      async () => {
        await reorderSteps(bulkUpdateData);
        return items;
      },
      {
        optimisticData: items,
      },
    );

    toast.promise(mutatePromise, {
      loading: "Zmienianie kolejności...",
      success: "Kolejność została zmieniona!",
      error: "Nie udało się zmienić kolejności",
    });
  };

  // const mutateDeleteIngredient = async (ingredientId: string) => {
  //   const optimisticIngredients = (ingredients || []).filter(
  //     (ingredient) => ingredient.id !== ingredientId,
  //   );

  //   toast.promise(
  //     mutate(
  //       recipeId,
  //       async () => {
  //         await deleteIngredient(ingredientId);
  //         return optimisticIngredients;
  //       },
  //       {
  //         optimisticData: optimisticIngredients.sort((a, b) =>
  //           a.name.localeCompare(b.name),
  //         ),
  //       },
  //     ),
  //     {
  //       loading: "Usuwanie składnika...",
  //       success: "Składnik usuniety!",
  //       error: "Nie udało się usunąć składnika",
  //     },
  //   );
  // };

  return {
    steps,
    mutateAddStep,
    mutateStepReorder,
  };
};
