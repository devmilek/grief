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
import { Loader2, Trash } from "lucide-react";
import { useUtilityData } from "@/components/providers/utility-data-provider";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { SITE_NAME } from "@/constants";
import { updateRecipe } from "@/actions/recipe-creation/update-recipe";
import Image from "next/image";
import Dropzone from "@/components/dropzone";
import { toast } from "sonner";
import { setRecipePublish } from "@/actions/recipe-creation/set-recipe-publish";
import { useSWRConfig } from "swr";

interface BasicsFormProps {
  recipe: Recipe;
  isComplete: boolean;
}

const BasicsForm = ({ recipe, isComplete }: BasicsFormProps) => {
  const { categories } = useUtilityData();
  const { mutate } = useSWRConfig();

  const form = useForm<z.infer<typeof BasicsInformationSchema>>({
    resolver: zodResolver(BasicsInformationSchema),
    defaultValues: {
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      categoryId: recipe.categoryId,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      preparationTime: recipe.preparationTime,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof BasicsInformationSchema>) => {
    const updateMutation = async () => {
      const updated = await updateRecipe(recipe.id, values);
      const mutated = await mutate(recipe.id, updated);
      form.reset({
        name: mutated?.name,
        image: mutated?.image,
        description: mutated?.description,
        categoryId: mutated?.categoryId,
        servings: mutated?.servings,
        difficulty: mutated?.difficulty,
        preparationTime: mutated?.preparationTime,
      });
    };
    toast.promise(updateMutation, {
      error: "Nie udało się zaktualizować przepisu",
      loading: "Aktualizowanie przepisu...",
      success: "Przepis został zaktualizowany",
    });
  };

  const togglePublish = async () => {
    toast.promise(
      async () => {
        await setRecipePublish(recipe.id, !recipe.published);
        await mutate(
          recipe.id,
          { ...recipe, published: !recipe.published },
          {
            revalidate: false,
          },
        );
      },
      {
        error: (e: any) => e.message,
        loading: "Zmienianie statusu publikacji...",
        success: "Status publikacji został zmieniony",
      },
    );
  };

  const { isDirty, isValid } = form.formState;

  return (
    <div>
      <div className="bg-white rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div>
            <h1 className="font-display text-4xl mb-2">Tworzenie przepisu</h1>
            <p className="text-neutral-500 text-sm">
              Przesyłanie własnych przepisów jest łatwe! Dodaj swój przepis do
              ulubionych, udostępnij go znajomym, rodzinie lub społeczności{" "}
              <strong>{SITE_NAME}</strong>.
            </p>
          </div>
          <div className="space-x-2 grid grid-cols-2 md:mb-0 md:flex">
            <Button
              variant="outline"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!isDirty || isLoading}
            >
              {isDirty ? "Zapisz" : "Zapisano"}
            </Button>
            <Button
              disabled={!isValid || isLoading}
              className="disabled:pointer-events-auto"
              onClick={form.handleSubmit(togglePublish)}
            >
              {recipe.published ? "Cofnij publikacje" : "Opublikuj"}
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
                  <FormControl className="flex items-center">
                    {field.value ? (
                      <div className="p-4 w-2/5 border rounded-xl mx-auto relative overflow-hidden group">
                        <div className="aspect-[4/3] w-full relative">
                          <Image src={field.value} fill alt="Recipe image" />
                        </div>
                        <div className="absolute z-40 bg-gradient-to-tr from-black/0 to-black/50 inset-0 w-full h-full flex items-center justify-center group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="outline"
                            className="top-8 right-8 absolute"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Dropzone
                        onUpload={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-6 w-full grid sm:grid-cols-2 gap-6">
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
