"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Difficulty, Recipe } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { difficultyMap } from "@/maps";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BasicsDropzone from "./basics-dropzone";
import { useUtilityData } from "@/components/providers/utility-data-provider";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { SITE_NAME } from "@/constants";
import { updateRecipe } from "@/actions/recipe-creation/update-recipe";

interface BasicsFormProps {
  recipe: Recipe;
  isPublished: boolean;
  isComplete: boolean;
}

const BasicsForm = ({ recipe, isComplete, isPublished }: BasicsFormProps) => {
  const { categories } = useUtilityData();

  const form = useForm<z.infer<typeof BasicsInformationSchema>>({
    resolver: zodResolver(BasicsInformationSchema),
    defaultValues: {
      name: recipe?.name || "",
      image: recipe?.image || "",
      description: recipe?.description || "",
      categoryId: recipe?.categoryId || undefined,
      servings: recipe?.servings || undefined,
      difficulty: recipe?.difficulty || undefined,
      preparationTime: recipe?.preparationTime || undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof BasicsInformationSchema>) => {
    try {
      const updatedRecipe = await updateRecipe(recipe.id, values);
    } catch (e) {
      console.log(e);
    }
  };

  const togglePublish = async () => {
    // if (isComplete) {
    //   try {
    //     if (!isPublished) {
    //       await axios.post(`/api/recipe/${recipe.id}/publish`);
    //       toast.success("Przepis został opublikowany");
    //       //TODO: modal with link to recipe
    //     } else {
    //       await axios.post(`/api/recipe/${recipe.id}/unpublish`);
    //       toast.success("Przepis został ukryty");
    //     }
    //     router.refresh();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    //   toast.error("Uzupełnij wszystkie pola aby opublikować");
    // }
  };

  const { isDirty } = form.formState;

  return (
    <div>
      <div className="bg-white rounded-xl">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="font-display text-4xl mb-2">Tworzenie przepisu</h1>
            <p className="text-neutral-500 text-sm mb-6">
              Przesyłanie własnych przepisów jest łatwe! Dodaj swój przepis do
              ulubionych, udostępnij go znajomym, rodzinie lub społeczności{" "}
              <strong>{SITE_NAME}</strong>.
            </p>
          </div>
          <div className="space-x-2 flex">
            <Button
              variant="outline"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!isDirty}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isDirty ? "Zapisz" : "Zapisano"}
            </Button>
            <Button
              disabled={!isComplete}
              className="w-full disabled:pointer-events-auto"
              onClick={togglePublish}
            >
              {isPublished ? "Cofnij publikacje" : "Opublikuj"}
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa przepisu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="text"
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      disabled={isLoading}
                      {...field}
                      placeholder=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <BasicsDropzone
                      disabled={isLoading}
                      recipeId={"asdfasdf"}
                      setValue={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-6 w-full grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoria</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz kategorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ilość porcji</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poziom trudności</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz poziom trudności" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Difficulty).map((diff) => (
                          <SelectItem key={diff} value={diff}>
                            {difficultyMap[diff]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preparationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Czas przygotowania{" "}
                      <span className="text-xs font-normal text-neutral-500">
                        (w minutach)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        className="w-full"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BasicsForm;