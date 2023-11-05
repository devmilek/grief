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
import { Cuisine, Occasion } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface OccasionsSelectProps {
  recipeId: string;
  occasions: Occasion[];
  selectedOccasions: {
    recipeId: string;
    assignedAt: Date;
    occassion: Occasion;
    occassionId: string;
  }[];
}

const OccasionsSelect = ({
  recipeId,
  selectedOccasions,
  occasions,
}: OccasionsSelectProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleValueChange = async (value: string) => {
    setIsLoading(true);
    try {
      const occasion = await axios.post(`/api/recipe/${recipeId}/occasions`, {
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
      await axios.delete(`/api/recipe/${recipeId}/occasions/${id}`);
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
          <SelectValue placeholder="Wybierz okazje" />
        </SelectTrigger>
        <SelectContent>
          {occasions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedOccasions.map((data) => (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-neutral-200"
            key={data.occassionId}
            onClick={() => {
              handleDelete(data.occassionId);
            }}
          >
            {data.occassion?.name}
            <XIcon className="ml-2 h-2 w-2" />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default OccasionsSelect;
