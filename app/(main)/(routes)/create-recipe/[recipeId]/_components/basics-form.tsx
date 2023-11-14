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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  Difficulty,
  Image,
  Recipe,
  ServingType,
} from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { difficultyMap, servingMap } from "@/maps";
import RecipeDropzone from "@/components/recipe-dropzone";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import BasicsDropzone from "./basics-dropzone";

interface BasicsFormProps {
  recipe: Recipe;
  recipeId: string;
  categories: Category[];
  isPublished: boolean;
  isComplete: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nazwa przepisu jest wymagana",
  }),
  image: z.string(),
  description: z.string().min(1, {
    message: "Opis przepisu jest wymagany",
  }),
  categoryId: z.string({
    required_error: "Kategoria jest wymagana",
  }),
  servingAmount: z.coerce.number(),
  servingType: z.nativeEnum(ServingType),
  difficulty: z.nativeEnum(Difficulty),
  preparationTime: z.coerce.number({
    invalid_type_error: "Czas przygotowania musi być liczbą",
    required_error: "Czas przygotowania jest wymagany",
  }),
});

const BasicsForm = ({
  recipe,
  recipeId,
  categories,
  isComplete,
  isPublished,
}: BasicsFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: recipe.name || "",
      image: recipe.image || "",
      description: recipe.description || "",
      categoryId: recipe.categoryId || undefined,
      servingAmount: recipe.servingAmount || undefined,
      servingType: recipe.servingType || ServingType.SERVINGS,
      difficulty: recipe.difficulty || Difficulty.EASY,
      preparationTime: recipe.preparationTime || undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const recipe = await axios.patch(
        `/api/recipe/${recipeId}/basics`,
        values,
      );
      toast.success("Przepis został zapisany");
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const togglePublish = async () => {
    if (isComplete) {
      try {
        if (!isPublished) {
          await axios.post(`/api/recipe/${recipeId}/publish`);
          toast.success("Przepis został opublikowany");
          //TODO: modal with link to recipe
        } else {
          await axios.post(`/api/recipe/${recipeId}/unpublish`);
          toast.success("Przepis został ukryty");
        }
        router.refresh();
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Uzupełnij wszystkie pola aby opublikować");
    }
  };

  return (
    <div>
      <div className=" bg-white rounded-xl">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="font-display text-4xl mb-2">Tworzenie przepisu</h1>
            <p className="text-neutral-500 text-sm mb-6">
              Przesyłanie własnych przepisów jest łatwe! Dodaj swój przepis do
              ulubionych, udostępnij go znajomym, rodzinie lub społeczności{" "}
              <span>grief</span>.
            </p>
          </div>
          <div className="space-x-2 flex">
            <Button
              variant="outline"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Zapisz
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
                    {/* <RecipeDropzone
                      disabled={isLoading}
                      recipeId={recipeId}
                      images={field.value}
                    /> */}
                    <BasicsDropzone
                      disabled={isLoading}
                      recipeId={recipeId}
                      setValue={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-6 w-full space-y-8">
              <div className="grid grid-cols-2 gap-8">
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
                <div>
                  <Label>Typ porcji</Label>
                  <div className="space-x-3 flex items-center mt-2 w-full">
                    <FormField
                      control={form.control}
                      name="servingAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="0"
                              className="w-32"
                              disabled={isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="servingType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="0" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(ServingType).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {servingMap[type]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
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
                            <SelectValue placeholder="Wybierz trudność" />
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
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BasicsForm;
