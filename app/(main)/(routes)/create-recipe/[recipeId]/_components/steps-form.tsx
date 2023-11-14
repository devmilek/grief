"use client";

import StepCard from "@/components/cards/step-card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { PreparationStep } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface StepsFormProps {
  recipeId: String;
  steps: PreparationStep[];
}

const formSchema = z.object({
  image: z.string().optional(),
  content: z.string().min(1),
});

const StepsForm = ({ recipeId, steps }: StepsFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const step = await axios.post(`/api/recipe/${recipeId}/steps`, {
        ...values,
        order: steps.length + 1,
      });
      router.refresh();
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  //TODO: reorder steps

  return (
    <div>
      <div className="p-8 bg-white rounded-xl">
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
                      recipeId={recipeId}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="content"
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
                Dodaj do listy
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {steps.length > 0 && (
        <>
          <h1 className="font-display text-3xl mb-8 mt-16">Lista kroków</h1>
          <div className="space-y-4">
            {steps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StepsForm;
