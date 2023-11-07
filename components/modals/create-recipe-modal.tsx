"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useCreateRecipeModal } from "@/hooks/use-create-recipe";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
});

const CreateRecipeModal = () => {
  const { isOpen, onClose } = useCreateRecipeModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const recipe = await axios.post("/api/recipe", values);
      router.push(`/create-recipe/${recipe.data.id}`);
      onClose();
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Utwórz przepis</DialogTitle>
          <DialogDescription>
            Nazwij swój przepis aby kontynuuowac, nazwe można później zmienić.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" disabled={isLoading} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              Anuluj
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Utwórz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
