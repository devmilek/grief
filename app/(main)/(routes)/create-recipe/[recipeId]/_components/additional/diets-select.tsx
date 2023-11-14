"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/db";
import { Cuisine, Occasion, Diet } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface DietsSelectProps {
  recipeId: string;
  diets: Diet[];
  selectedDiets: {
    recipeId: string;
    assignedAt: Date;
    diet: Diet;
    dietId: string;
  }[];
}

const DietsSelect = ({ recipeId, selectedDiets, diets }: DietsSelectProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleValueChange = async (value: string) => {
    setIsLoading(true);
    try {
      const occasion = await axios.post(`/api/recipe/${recipeId}/diets`, {
        value,
      });
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/recipe/${recipeId}/diets/${id}`);
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Select disabled={isLoading} value="" onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Wybierz diete" />
        </SelectTrigger>
        <SelectContent>
          {diets.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedDiets.map((data) => (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-neutral-200"
            key={data.dietId}
            onClick={() => {
              handleDelete(data.dietId);
            }}
          >
            {data.diet.name}
            <XIcon className="ml-2 h-2 w-2" />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default DietsSelect;
