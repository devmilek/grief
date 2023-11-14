"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { additionalQuantityMap, unitMap } from "@/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ingredient } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface IngredientFormProps {
  recipeId: string;
  ingredients: Ingredient[];
}

const formSchema = z.object({
  quantity: z.coerce.number().min(0).optional(),
  unit: z.string(),
  name: z.string().min(1),
});

const IngredientForm = ({ recipeId, ingredients }: IngredientFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      unit: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const ingredient = await axios.post(
        `/api/recipe/${recipeId}/ingredient`,
        values,
      );
      form.reset();
      form.setValue("quantity", undefined);
      console.log(ingredient);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async (ingredientId: string) => {
    try {
      const ingredient = await axios.delete(
        `/api/recipe/${recipeId}/ingredient/${ingredientId}`,
      );
      console.log(ingredient);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="p-8 rounded-xl bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-end space-y-4"
          >
            <div className="flex space-x-3 items-end w-full">
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ilość</FormLabel>
                    <FormControl>
                      <Input
                        className="w-20"
                        placeholder="0"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jednostka</FormLabel>
                    <FormControl>
                      <Input
                        className="w-32"
                        {...field}
                        placeholder="np. Gram"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nazwa</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="np. Mąka"
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="ml-auto">
              Dodaj do listy
            </Button>
          </form>
        </Form>
      </div>
      {ingredients.length > 0 && (
        <>
          <h1 className="font-display text-2xl mb-4 mt-8">Lista składników</h1>
          <div className="space-y-3">
            {ingredients.map((ingredient) => (
              <div
                className="px-6 py-3 rounded-xl bg-white text-sm flex items-center"
                key={ingredient.id}
              >
                <p className="font-medium mr-6">
                  {ingredient.quantity} {ingredient.unit}
                </p>
                <p>{ingredient.name}</p>
                <Button
                  onClick={() => {
                    onDelete(ingredient.id);
                  }}
                  size="icon"
                  className="ml-auto"
                  variant="ghost"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientForm;
