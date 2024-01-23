"use client";

import StepDropzone from "@/components/step-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PreparationStepSchema } from "@/schemas/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { PreparationStep } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface StepsFormProps {
  addStepFn: (step: z.infer<typeof PreparationStepSchema>) => void;
}

const StepsForm = ({ addStepFn }: StepsFormProps) => {
  const params: { recipeId: string } = useParams();

  const form = useForm<z.infer<typeof PreparationStepSchema>>({
    resolver: zodResolver(PreparationStepSchema),
    defaultValues: {
      image: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof PreparationStepSchema>) => {
    addStepFn(values);
    form.reset();
  };

  //TODO: reorder steps

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StepDropzone
                  value={field.value}
                  setValue={field.onChange}
                  disabled={isLoading}
                  recipeId={params.recipeId}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Treść kroku</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading} rows={5} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Dodaj do listy
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepsForm;
