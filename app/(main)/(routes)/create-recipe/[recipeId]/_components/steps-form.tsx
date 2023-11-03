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
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface StepsFormProps {
  id: String;
}

const formSchema = z.object({
  image: z.string().optional(),
  content: z.string().min(1),
});

const StepsForm = ({ id }: StepsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      content: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const step = await axios.post(`/api/recipe/${id}/steps`, values);
      router.refresh();
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-4">Dodaj krok</h1>
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
                      disabled={false}
                      recipeId={id}
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
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Dodaj do listy</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepsForm;
