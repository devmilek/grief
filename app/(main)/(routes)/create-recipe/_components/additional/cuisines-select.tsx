"use client";

import { useUtilityData } from "@/components/providers/utility-data-provider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cuisine, Occasion } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

interface CuisinesSelectProps {
  recipeId: string;
}

const CuisinesSelect = ({ recipeId }: CuisinesSelectProps) => {
  const { cuisines } = useUtilityData();
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/recipe/${recipeId}/cuisines`);
      console.log("SELECTED CUISINES", res.data);
      setSelectedCuisines(res.data);
    };

    fetch();
  }, [recipeId]);

  const handleValueChange = async (id: string) => {
    const exists = selectedCuisines.find((item) => item.id === id);
    if (exists) {
      return toast.error("Ta kuchnia już została dodana");
    }
    const addPromise = axios.post(`/api/recipe/${recipeId}/cuisines`, {
      id,
    });

    toast.promise(addPromise, {
      loading: "Dodawanie kuchni...",
      success: (data) => {
        setSelectedCuisines([...selectedCuisines, data.data]);
        return "Kuchnia została dodana";
      },
      error: "Wystąpił błąd",
    });

    try {
      await addPromise;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    const deletePromise = axios.delete(
      `/api/recipe/${recipeId}/cuisines/${id}`,
    );

    toast.promise(deletePromise, {
      loading: "Usuwanie kuchni...",
      success: () => {
        setSelectedCuisines(selectedCuisines.filter((item) => item.id !== id));
        return "Kuchnia została usunięta";
      },
      error: "Wystąpił błąd",
    });

    try {
      await deletePromise;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Select value="" onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Wybierz kuchnie" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-60">
            {cuisines.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedCuisines.map((data) => (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-neutral-200"
            key={data.id}
            onClick={() => {
              handleDelete(data.id);
            }}
          >
            {data.name}
            <XIcon className="ml-2 h-2 w-2" />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CuisinesSelect;
