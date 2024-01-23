import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { difficultyMap } from "@/maps";
import { Difficulty } from "@prisma/client";
import React from "react";

interface BasicsDifficultySelectProps {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

const BasicsDifficultySelect = ({
  isLoading,
  value,
  onChange,
}: BasicsDifficultySelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value} disabled={isLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Wybierz trudność" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Difficulty).map((diff) => (
          <SelectItem key={diff} value={diff}>
            {difficultyMap[diff]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BasicsDifficultySelect;
