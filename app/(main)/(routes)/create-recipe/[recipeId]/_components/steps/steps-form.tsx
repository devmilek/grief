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
import { zodResolver } from "@hookform/resolvers/zod";
import { PreparationStep } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface StepsFormProps {
  steps: PreparationStep[];
  pushStep: (step: PreparationStep) => void;
}

const formSchema = z.object({
  image: z.string().optional(),
  content: z.string().min(1),
});

const StepsForm = ({ steps, pushStep }: StepsFormProps) => {
  const router = useRouter();
  const params: { recipeId: string } = useParams();

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
      const step = await axios.post(`/api/recipe/${params.recipeId}/steps`, {
        ...values,
      });
      pushStep(step.data);
      form.reset();
    } catch (e) {
      console.log(e);
    }
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
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Dodaj do listy
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepsForm;
