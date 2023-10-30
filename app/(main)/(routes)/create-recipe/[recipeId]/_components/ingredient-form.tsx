import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { additionalQuantityMap, unitMap } from "@/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdditionalQuantity, Ingredient } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface IngredientFormProps {
  id: string;
  ingredients: Ingredient[];
}

const formSchema = z.object({
  quantity: z.coerce.number().min(0).optional(),
  additionalQuantity: z.nativeEnum(AdditionalQuantity).optional(),
  name: z.string().min(1),
});

const IngredientForm = ({ id, ingredients }: IngredientFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: undefined,
      additionalQuantity: undefined,
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const ingredient = await axios.post(
        `/api/recipe/${id}/ingredient`,
        values,
      );
      form.reset();
      form.setValue("quantity", undefined);
      console.log(ingredient);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async (ingredientId: string) => {
    try {
      const ingredient = await axios.delete(
        `/api/recipe/${id}/ingredient/${ingredientId}`,
      );
      console.log(ingredient);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-4">Dodaj składnik</h1>
      <div className="p-8 rounded-xl bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-end space-y-4"
          >
            <div className="flex space-x-4 items-end w-full">
              <FormField
                name="quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ilość</FormLabel>
                    <FormControl>
                      <Input
                        className="w-14"
                        placeholder="0"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="additionalQuantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AdditionalQuantity).map((item) => (
                          <SelectItem key={item} value={item}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: additionalQuantityMap[item],
                              }}
                            ></p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="ml-auto">
              Dodaj do listy
            </Button>
          </form>
        </Form>
      </div>
      <h1 className="font-display text-3xl mb-4 mt-8">Składniki</h1>
      <div className="space-y-3">
        {ingredients.map((ingredient) => (
          <div
            className="px-6 py-3 rounded-xl bg-white text-sm flex items-center"
            key={ingredient.id}
          >
            <p className="font-medium w-12">
              {ingredient.quantity > 0 ? ingredient.quantity : ""}{" "}
              {ingredient.additionalQuantity && (
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      additionalQuantityMap[ingredient.additionalQuantity],
                  }}
                ></p>
              )}
            </p>
            <p>{ingredient.name}</p>
            <Button
              onClick={() => {
                onDelete(ingredient.id);
              }}
              size="icon"
              className="ml-auto"
              variant="ghost"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientForm;
