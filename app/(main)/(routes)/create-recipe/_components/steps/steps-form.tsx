"use client";

import Dropzone from "@/components/dropzone";
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
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
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
                  <Dropzone onUpload={field.onChange} disabled={isLoading} />
                )}
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
