import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { difficultyMap } from "@/maps";
import { Difficulty, Recipe } from "@prisma/client";
import React from "react";
import { Form, useForm } from "react-hook-form";
import BasicsDropzone from "./basics/basics-dropzone";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { BasicsInformationSchema } from "@/schemas/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUtilityData } from "@/components/providers/utility-data-provider";

interface BasicsFormProps {
  recipe?: Recipe;
  onSubmit: (values: z.infer<typeof BasicsInformationSchema>) => void;
}

const BasicsForm = ({ recipe, onSubmit }: BasicsFormProps) => {
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

  return (
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
                  recipeId={"sdfv"}
                  disabled={isLoading}
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
  );
};

export default BasicsForm;
