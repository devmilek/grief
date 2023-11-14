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
import { zodResolver } from "@hookform/resolvers/zod";
import { Ingredient } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  quantity: z.coerce.number().min(0).optional(),
  unit: z.string(),
  name: z.string().min(1),
});

const IngredientForm = () => {
  const router = useRouter();
  const params = useParams();
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
        `/api/recipe/${params.recipeId}/ingredient`,
        values,
      );
      form.reset();
      form.setValue("quantity", undefined);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
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
                  <Input className="w-32" {...field} placeholder="np. Gram" />
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
        <Button type="submit" disabled={isLoading} className="ml-auto">
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Dodaj do listy
        </Button>
      </form>
    </Form>
  );
};

export default IngredientForm;
