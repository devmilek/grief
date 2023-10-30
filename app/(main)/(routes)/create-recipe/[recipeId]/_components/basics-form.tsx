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
import { Difficulty, ServingType } from "@prisma/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreateRecipeFormProps } from "./create-recipe-form";
import { difficultyMap, servingMap } from "@/maps";
import Dropzone from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  images: z
    .object({
      id: z.string(),
      url: z.string(),
      alt: z.string().nullable(),
      size: z.number(),
      name: z.string(),
      recipeId: z.string(),
      updatedAt: z.date(),
      createdAt: z.date(),
    })
    .array(),
  description: z.string().min(1),
  categoryId: z.string(),
  servingAmount: z.coerce.number(),
  servingType: z.nativeEnum(ServingType),
  difficulty: z.nativeEnum(Difficulty),
  preparationTime: z.coerce.number(),
});

const BasicsForm = ({ data, categories }: CreateRecipeFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      name: data.name || "",
      images: data.images || [],
      description: data.description || "",
      categoryId: data.categoryId || undefined,
      servingAmount: data.servingAmount || undefined,
      servingType: data.servingType || ServingType.SERVINGS,
      difficulty: data.difficulty || Difficulty.EASY,
      preparationTime: data.preparationTime || undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const recipe = await axios.patch(`/api/recipe/${data.id}/basics`, values);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-4">Podstawy</h1>
      <div className="p-12 bg-white rounded-xl">
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <Dropzone
                      disabled={isLoading}
                      recipeId={data.id}
                      images={field.value}
                    />
                  </FormControl>
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
                </FormItem>
              )}
            />
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
                      <SelectTrigger className="w-60">
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
                </FormItem>
              )}
            />
            <div>
              <Label>Typ porcji</Label>
              <p className="mt-1 text-sm text-neutral-500">
                Wybierz porcje (porcja dla jednej osoby) lub kawałki (np.
                kawałek ciasta).
              </p>
              <div className="space-x-3 flex items-center mt-4">
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
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-40">
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
                      <SelectTrigger className="w-40">
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
                      className="w-32"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Zapisz
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BasicsForm;
