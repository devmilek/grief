import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import React from "react";

interface BasicsCategorySelectProps {
  categories: Category[];
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

const BasicsCategorySelect = async ({
  categories,
  isLoading,
  onChange,
  value,
}: BasicsCategorySelectProps) => {
  return (
    <Select disabled={isLoading} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Wybierz kategorie" />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BasicsCategorySelect;
