"use client";

import { useUtilityData } from "@/components/providers/utility-data-provider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cuisine, Diet, Occasion } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

interface DietsSelectProps {
  recipeId: string;
}

const DietsSelect = ({ recipeId }: DietsSelectProps) => {
  const { diets } = useUtilityData();
  const [selectedDiets, setSelectedDiets] = useState<Occasion[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/recipe/${recipeId}/diets`);
      console.log("SELECTED CUISINES", res.data);
      setSelectedDiets(res.data);
    };

    fetch();
  }, [recipeId]);

  const handleValueChange = async (id: string) => {
    const exists = selectedDiets.find((item) => item.id === id);

    if (exists) {
      return toast.error("Ta dieta już została dodana");
    }

    const addPromise = axios.post(`/api/recipe/${recipeId}/diets`, {
      id,
    });

    toast.promise(addPromise, {
      loading: "Dodawanie diety...",
      success: (data) => {
        setSelectedDiets([...selectedDiets, data.data]);
        return "Dieta została dodana";
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
    const deletePromise = axios.delete(`/api/recipe/${recipeId}/diets/${id}`);

    toast.promise(deletePromise, {
      loading: "Usuwanie diety...",
      success: () => {
        setSelectedDiets(selectedDiets.filter((item) => item.id !== id));
        return "Dieta została usunięta";
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

export default DietsSelect;
